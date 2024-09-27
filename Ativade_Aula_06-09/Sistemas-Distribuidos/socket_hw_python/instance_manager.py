import subprocess
import threading
import time
import logging

class InstanceManager:
    def __init__(self, coordinator, initial_instances=2, max_load_threshold=0.8):
        self.coordinator = coordinator
        self.initial_instances = initial_instances
        self.max_load_threshold = max_load_threshold
        self.instances = []
        self.lock = threading.Lock()

    def start(self):
        # Start initial instances
        for _ in range(self.initial_instances):
            self._start_new_instance()
        
        # Start monitoring thread
        threading.Thread(target=self._monitor_load, daemon=True).start()

    def _start_new_instance(self):
        instance_process = subprocess.Popen(["python", "instance.py"])
        with self.lock:
            self.instances.append(instance_process)
        logging.info(f"Started new instance. Total instances: {len(self.instances)}")

    def _monitor_load(self):
        while True:
            time.sleep(10)  # Check every 10 seconds
            with self.lock:
                total_load = sum(instance.load for instance in self.coordinator.instances.values())
                avg_load = total_load / len(self.coordinator.instances) if self.coordinator.instances else 0
                
                if avg_load > self.max_load_threshold:
                    self._start_new_instance()
                
                # Check for terminated instances and remove them
                self.instances = [inst for inst in self.instances if inst.poll() is None]

    def stop_all_instances(self):
        with self.lock:
            for instance in self.instances:
                instance.terminate()
            self.instances = []
        logging.info("All instances have been stopped.")