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
HOST = '0.0.0.0'  # Escuta em todas as interfacesPORT = 8888
PORT = 8888
class Instance:
     ## Define uma classe para representar uma instância, com seu endereço, carga e timestamp 
    def __init__(self, addr):
        self.addr = addr
        self.load = 0
        self.last_heartbeat = time.time()
        
## Configura e retorna um socket multicast para comunicação em grupo
def setup_multicast_socket():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind(('', MCAST_PORT))
    mreq = struct.pack("4sl", socket.inet_aton(MCAST_GRP), socket.INADDR_ANY)
    sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    return sock

class IntegratedCoordinator:
     # Inicialização de atributos
    def __init__(self):
        self.instances = {}
        self.lock = threading.Lock()
        self.mcast_sock = setup_multicast_socket()
        self.health_checker = HealthChecker([])
        self.load_balancer = LoadBalancer()
        self.instance_manager = InstanceManager(self)

    # (inicia threads e o coordenador)
    def start(self):
        self.health_checker.start()
        self.instance_manager.start()
        threading.Thread(target=self._listen_for_instances, daemon=True).start()
        threading.Thread(target=self._print_health_status, daemon=True).start()
        threading.Thread(target=self._print_system_status, daemon=True).start()
        self._start_coordinator()

    #  (imprime o status de saúde periodicamente)
    def _print_health_status(self):
        while True:
            time.sleep(30)  # Imprime o status a cada 10 segundos
            logging.info("Current health status:")
            health_status = self.health_checker.get_health_status()
            for instance, status in health_status.items():
                logging.info(f"{instance}: {'Healthy' if status else 'Unhealthy'}")
            logging.info(f"Healthy instances: {self.health_checker.get_healthy_instances()}")

    # (escuta por registros e heartbeats de instâncias)
    def _listen_for_instances(self):
        while True:
            data, addr = self.multicast_socket.recvfrom(1024)
            message = data.decode()
            logging.info(f"Received message: {message}")
            if message.startswith("REGISTER:"):
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
            elif message.startswith("HEARTBEAT:"):
                parts = message.split(":")
                instance_addr = (parts[1], int(parts[2]))
                load = int(parts[3])
                with self.lock:
                    if instance_addr in self.instances:
                        self.instances[instance_addr].load = load
                        self.instances[instance_addr].last_heartbeat = time.time()
                        self.load_balancer.update_instance_load(instance_addr, load)
                        logging.info(f"Received heartbeat from {instance_addr}. Load: {load}")
                    else:
                        logging.warning(f"Received heartbeat from unknown instance: {instance_addr}")
                        
    # (inicia o servidor do coordenador)
    def _start_coordinator(self):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind((HOST, PORT))
            s.listen()
            print(f"Coordinator listening on {HOST}:{PORT}")
            
            while True:
                conn, addr = s.accept()
                threading.Thread(target=self._handle_client, args=(conn, addr)).start()

     ##  (escuta por registros e heartbeats de instâncias)

    def _listen_for_instances(self):
       while True:
            data, addr = self.mcast_sock.recvfrom(1024)
            message = data.decode()
            logging.info(f"Received message: {message}")
            if message.startswith("REGISTER:"):
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
            elif message.startswith("HEARTBEAT:"):
                parts = message.split(":")
                instance_addr = (parts[1], int(parts[2]))
                load = int(parts[3])
                with self.lock:
                    if instance_addr in self.instances:
                        self.instances[instance_addr].load = load
                        self.instances[instance_addr].last_heartbeat = time.time()
                        self.load_balancer.update_instance_load(instance_addr, load)
                        logging.info(f"Received heartbeat from {instance_addr}. Load: {load}")
                    else:
                        logging.warning(f"Received heartbeat from unknown instance: {instance_addr}")

    # (lida com conexões de clientes)
    def _handle_client(self, conn, addr):
         with conn:
            data = conn.recv(1024).decode()
            logging.info(f"Received from client {addr}: {data}")
            if data:
                if data == "HEALTH_CHECK":
                    health_status = all(self.health_checker.get_health_status().values())
                    conn.sendall(b'OK' if health_status else b'NOT_OK')
                else:
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

    def _handle_connection(self, conn, addr):
        with conn:
            data = conn.recv(1024).decode()
            logging.info(f"Received from coordinator: {data}")
            if data == "HEALTH_CHECK":
                conn.sendall(b"OK")
                logging.info(f"Responded to health check with OK")
            elif data == "Hello":
                response = "World"
                conn.sendall(response.encode())
                logging.info(f"Received 'Hello', responded with 'World'")
            else:
                with self.lock:
                    self.load += 1
                self.task_queue.put(data)
                response = f"Task processed by instance {self.host}:{self.port}: {data}"
                conn.sendall(response.encode())
                logging.info(f"Processed task: {data}. Current load: {self.load}")
                
    # (para o health checker)    
    def stop(self):
        self.health_checker.stop()
        self.instance_manager.stop_all_instances()
    
    # def _print_system_status(self):
    #        while True:
    #         time.sleep(10)  # Imprime a cada 10 segundos
    #         with self.lock:
    #             logging.info("Current system status:")
    #             for addr, instance in self.instances.items():
    #                 health = self.health_checker.is_healthy(addr)
    #                 logging.info(f"Instance {addr}: Load={instance.load}, Healthy={health}")

if __name__ == '__main__':
    coordinator = IntegratedCoordinator()
    try:
        coordinator.start()
    except KeyboardInterrupt:
        print("Stopping coordinator...")
        coordinator.stop()
        print("Coordinator stopped.")