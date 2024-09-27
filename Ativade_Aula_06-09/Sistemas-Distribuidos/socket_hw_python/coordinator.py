import socket
import threading
import queue
import struct
import json
import time
import logging
from health_check import HealthChecker
from load_balancer import LoadBalancer  
from instance_manager import InstanceManager

# Configuração do logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

MCAST_GRP = '224.1.1.1'
MCAST_PORT = 5007
HOST = '0.0.0.0'  # Escuta em todas as interfaces
PORT = 8888

class Instance:
    def __init__(self, addr):
        self.addr = addr
        self.load = 0
        self.last_heartbeat = time.time()

def setup_multicast_socket():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind(('', MCAST_PORT))
    mreq = struct.pack("4sl", socket.inet_aton(MCAST_GRP), socket.INADDR_ANY)
    sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    sock.settimeout(5)  # Aumentado para 5 segundos
    logging.info(f"Multicast socket set up on group {MCAST_GRP} and port {MCAST_PORT}")
    return sock

class IntegratedCoordinator:
    def __init__(self):
        self.instances = {}
        self.lock = threading.Lock()
        self.mcast_sock = setup_multicast_socket()
        self.health_checker = HealthChecker([])
        self.load_balancer = LoadBalancer()
        self.instance_manager = InstanceManager(self)
        self.task_queue = queue.Queue()

    def start(self):
        self.health_checker.start()
        self.instance_manager.start()
        threading.Thread(target=self._listen_for_instances, daemon=True, name="InstanceListener").start()
        threading.Thread(target=self._print_health_status, daemon=True).start()
        threading.Thread(target=self._print_system_status, daemon=True).start()
        logging.info("Started listening for instances and client messages")
        self._start_coordinator()

    def _print_health_status(self):
        while True:
            time.sleep(30)
            logging.info("Current health status:")
            health_status = self.health_checker.get_health_status()
            for instance, status in health_status.items():
                logging.info(f"{instance}: {'Healthy' if status else 'Unhealthy'}")
            logging.info(f"Healthy instances: {self.health_checker.get_healthy_instances()}")

    def _listen_for_instances(self):
     logging.info("Starting to listen for instances and client messages")
     while True:
        try:
            data, addr = self.mcast_sock.recvfrom(1024)
            message = data.decode()
            logging.info(f"Received message from {addr}: {message}")

            if message == "Hello":
                self._handle_hello(addr)
            elif message.startswith("REGISTER:"):
                self._handle_register(message)
            elif message.startswith("HEARTBEAT:"):
                self._handle_heartbeat(message)
            else:
                logging.warning(f"Received unknown message: {message}")
        except socket.timeout:
            # Timeout occurred, but this is expected. Just continue the loop.
            pass
        except Exception as e:
            logging.error(f"Error in _listen_for_instances: {e}", exc_info=True)

    def _handle_hello(self, addr):
        logging.info(f"Sending 'World' response to {addr}")
        try:
            bytes_sent = self.mcast_sock.sendto(b"World", addr)
            logging.info(f"Sent {bytes_sent} bytes to {addr}")
        except Exception as send_error:
            logging.error(f"Error sending response: {send_error}", exc_info=True)

    def _handle_register(self, message):
        parts = message.split(":")
        instance_addr = (parts[1], int(parts[2]))
        with self.lock:
            if instance_addr not in self.instances:
                self.instances[instance_addr] = Instance(instance_addr)
                self.health_checker.instances.append(instance_addr)
                self.health_checker.instance_health[instance_addr] = True
                self.load_balancer.add_instance(instance_addr)
                logging.info(f"Registered new instance: {instance_addr}")
            else:
                logging.info(f"Instance already registered: {instance_addr}")

    def _handle_heartbeat(self, message):
        parts = message.split(":")
        instance_addr = (parts[1], int(parts[2]))
        load = int(parts[3])
        with self.lock:
            if instance_addr in self.instances:
                self.instances[instance_addr].load = load
                self.instances[instance_addr].last_heartbeat = time.time()
                self.load_balancer.update_instance_load(instance_addr, load)
                logging.info(f"Updated heartbeat for {instance_addr}. Load: {load}")
            else:
                logging.warning(f"Received heartbeat from unknown instance: {instance_addr}")

    def _start_coordinator(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen()
            logging.info(f"Coordinator listening on {HOST}:{PORT}")
        
            while True:
                conn, addr = s.accept()
                logging.info(f"Accepted connection from {addr}")
                threading.Thread(target=self._handle_client, args=(conn, addr)).start()

    def _handle_client(self, conn, addr):
        with conn:
            data = conn.recv(1024).decode()
            logging.info(f"Received from client {addr}: {data}")
            if data:
                if data == "HEALTH_CHECK":
                    health_status = all(self.health_checker.get_health_status().values())
                    conn.sendall(b'OK' if health_status else b'NOT_OK')
                elif data == "Hello":
                    conn.sendall(b"World")
                    logging.info(f"Received 'Hello', responded with 'World'")
                else:
                    self._process_client_request(conn, data)

    def _process_client_request(self, conn, data):
        healthy_instances = self.health_checker.get_healthy_instances()
        logging.info(f"Healthy instances: {healthy_instances}")
        if healthy_instances:
            selected_instance = self.load_balancer.get_next_instance(healthy_instances)
            logging.info(f"Selected instance: {selected_instance}")
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as instance_sock:
                    instance_sock.connect(selected_instance)
                    instance_sock.sendall(data.encode())
                    response = instance_sock.recv(1024).decode()
                    conn.sendall(response.encode())
                self.load_balancer.update_instance_load(selected_instance, self.instances[selected_instance].load + 1)
                logging.info(f"Response from instance: {response}")
            except Exception as e:
                logging.error(f"Error communicating with instance: {str(e)}")
                conn.sendall(b'Error processing request')
        else:
            logging.warning("No healthy instances available")
            conn.sendall(b'No healthy instances available')

    def _print_system_status(self):
        while True:
            time.sleep(10)
            with self.lock:
                logging.info("Current system status:")
                for addr, instance in self.instances.items():
                    health = self.health_checker.is_healthy(addr)
                    logging.info(f"Instance {addr}: Load={instance.load}, Healthy={health}")

    def stop(self):
        self.health_checker.stop()
        self.instance_manager.stop_all_instances()

if __name__ == '__main__':
    coordinator = IntegratedCoordinator()
    try:
        coordinator.start()
    except KeyboardInterrupt:
        print("Stopping coordinator...")
        coordinator.stop()
        print("Coordinator stopped.")