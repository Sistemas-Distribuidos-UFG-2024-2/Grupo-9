import socket
import threading
import time
import queue
import logging

MCAST_GRP = '224.1.1.1'
MCAST_PORT = 5007

logging.basicConfig(level=logging.INFO, format='%(asctime)s - [%(threadName)s] - %(message)s')
# Função para obter o endereço IP local da máquina
def get_local_ip():
    try:
        # Cria uma conexão temporária para obter o IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return '127.0.0.1'  # Fallback para localhost se não conseguir obter o IP

# Classe que representa uma instância do serviço
class Instance:
    def __init__(self, host=None, port=0):
        self.host = host or get_local_ip()
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.bind((self.host, port))
        self.port = self.sock.getsockname()[1]
        self.load = 0
        self.lock = threading.Lock()
        self.task_queue = queue.Queue()
        self.health_check_count = 0

    # Método para iniciar a instância
    def start(self):
        self._register()
        self.sock.listen()
        threading.Thread(target=self._process_tasks, daemon=True, name="TaskProcessor").start()
        threading.Thread(target=self._send_heartbeats, daemon=True, name="HeartbeatSender").start()
        logging.info(f"Instance running on {self.host}:{self.port}")
        while True:
            conn, addr = self.sock.accept()
            threading.Thread(target=self._handle_connection, args=(conn, addr), daemon=True, name=f"Connection-{addr}").start()

    # Método para registrar a instância no coordenador
    def _register(self):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP) as sock:
            sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 32)
            message = f"REGISTER:{self.host}:{self.port}"
            sock.sendto(message.encode(), (MCAST_GRP, MCAST_PORT))
            logging.info(f"Registered with coordinator: {message}")

    # Método para enviar heartbeats periodicamente para o coordenador
    def _send_heartbeats(self):
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP) as sock:
            sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 32)
            while True:
                with self.lock:
                    message = f"HEARTBEAT:{self.host}:{self.port}:{self.load}"
                sock.sendto(message.encode(), (MCAST_GRP, MCAST_PORT))
                logging.info(f"Sent heartbeat: {message}")
                time.sleep(20)  # Send heartbeat every 5 seconds

    # Método para lidar com uma conexão recebida
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

    # Método para lidar com uma transferência de carga
    def _handle_transfer(self, data):
        transfer_type, amount = data.split(":")
        amount = int(amount)
        with self.lock:
            if transfer_type == "TRANSFER_IN":
                self.load += amount
                for _ in range(amount):
                    self.task_queue.put("DUMMY_TASK")
                logging.info(f"Received TRANSFER_IN: {amount}. New load: {self.load}")
            elif transfer_type == "TRANSFER_OUT":
                original_load = self.load
                self.load = max(0, self.load - amount)
                tasks_removed = min(amount, self.task_queue.qsize())
                for _ in range(tasks_removed):
                    self.task_queue.get()
                logging.info(f"Received TRANSFER_OUT: {amount}. Load changed from {original_load} to {self.load}")

    # Método para processar as tarefas na fila
    def _process_tasks(self):
        while True:
            task = self.task_queue.get()
            if task != "DUMMY_TASK":
                logging.info(f"Processing task: {task}")
                time.sleep(2)  # Simulating processing time
            with self.lock:
                self.load = max(0, self.load - 1)
            self.task_queue.task_done()
            logging.info(f"Finished task. Current load: {self.load}")

# Bloco principal para iniciar a instância
if __name__ == "__main__":
    instance = Instance()
    instance.start()