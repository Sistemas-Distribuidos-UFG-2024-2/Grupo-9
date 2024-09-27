import random
import threading

class LoadBalancer:
    def __init__(self):
        self.instances = {}  # Dicionário para armazenar as instâncias e suas respectivas cargas
        self.lock = threading.Lock()  # Lock para sincronização de acesso aos dados

    def add_instance(self, instance_addr):
        with self.lock:
            self.instances[instance_addr] = 0  # Adiciona uma nova instância ao balanceador de carga com carga inicial 0

    def update_instance_load(self, instance_addr, load):
        with self.lock:
            if instance_addr in self.instances:
                self.instances[instance_addr] = load  # Atualiza a carga de uma instância existente

    def get_next_instance(self, healthy_instances):
        with self.lock:
            # Filtra as instâncias saudáveis que estão registradas no balanceador de carga
            available_instances = [inst for inst in healthy_instances if inst in self.instances]
            if not available_instances:
                return None  # Retorna None se não houver instâncias disponíveis
            # Seleciona a instância com a menor carga
            return min(available_instances, key=lambda x: self.instances[x])

    def remove_instance(self, instance_addr):
        with self.lock:
            self.instances.pop(instance_addr, None)  # Remove uma instância do balanceador de carga, se existir