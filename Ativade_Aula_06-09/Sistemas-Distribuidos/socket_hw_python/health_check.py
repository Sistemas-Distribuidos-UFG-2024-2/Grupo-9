import socket
import threading
import time
import logging

class HealthChecker:
    def __init__(self, instances, check_interval=5):
        # Lista de instâncias para verificar a saúde
        self.instances = instances
        # Intervalo entre as verificações de saúde (em segundos)
        self.check_interval = check_interval
        # Dicionário para armazenar o status de saúde de cada instância
        self.instance_health = {addr: True for addr in instances}
        # Lock para sincronização de acesso aos dados
        self.lock = threading.Lock()
        # Evento para controlar a parada da thread de verificação de saúde
        self.stop_event = threading.Event()

    def start(self):
        # Inicia a thread de verificação de saúde
        self.health_check_thread = threading.Thread(target=self._health_check_loop, daemon=True)
        self.health_check_thread.start()

    def stop(self):
        # Para a thread de verificação de saúde
        self.stop_event.set()
        self.health_check_thread.join()

    def _health_check_loop(self):
        # Loop principal da thread de verificação de saúde
        while not self.stop_event.is_set():
            for instance in self.instances:
                # Verifica o status atual da instância
                current_status = self._check_instance(instance)
                with self.lock:
                    # Obtém o status anterior da instância
                    previous_status = self.instance_health[instance]
                    # Atualiza o status da instância
                    self.instance_health[instance] = current_status
                
                # Registra log apenas se houver mudança no status
                if current_status != previous_status:
                    if current_status:
                        logging.info(f"Instância {instance} agora está saudável")
                    else:
                        logging.warning(f"Instância {instance} agora está não saudável")
            
            # Aguarda o intervalo definido antes da próxima verificação
            time.sleep(self.check_interval)

    def _check_instance(self, instance):
        # Método auxiliar para verificar a saúde de uma única instância
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(2)
                s.connect(instance)
                s.sendall(b'HEALTH_CHECK')
                response = s.recv(1024).decode()
                return response == 'OK'
        except Exception as e:
            # Registra log de erro em caso de falha na verificação
            logging.error(f"Falha na verificação de saúde para {instance}: {str(e)}")
            return False

    def get_health_status(self):
        # Retorna o status de saúde de todas as instâncias
        with self.lock:
            return dict(self.instance_health)

    def is_healthy(self, instance):
        # Verifica se uma instância específica está saudável
        with self.lock:
            return self.instance_health.get(instance, False)

    def get_healthy_instances(self):
        # Retorna uma lista das instâncias saudáveis
        with self.lock:
            return [instance for instance, status in self.instance_health.items() if status]

# Exemplo de uso
if __name__ == '__main__':
    # Configura o logging
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    
    # Define as instâncias a serem verificadas
    INSTANCES = [('127.0.0.1', 8889), ('127.0.0.1', 8890), ('127.0.0.1', 8891)]
    
    # Cria e inicia o HealthChecker
    health_checker = HealthChecker(INSTANCES)
    health_checker.start()
    
    try:
        # Mantém o programa principal em execução
        while True:
            time.sleep(60)  # Dorme por um minuto
    except KeyboardInterrupt:
        # Trata a interrupção do teclado para parar o HealthChecker
        print("Parando o verificador de saúde...")
        health_checker.stop()
        print("Verificador de saúde parado.")