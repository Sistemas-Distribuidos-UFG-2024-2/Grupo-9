#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import grpc
import psutil
import socket
import sys
import asyncio
from datetime import datetime

import metric_service_pb2
import metric_service_pb2_grpc


# Função para enviar métricas para o servidor gRPC
CERTIFICATE_PATH = "certificate.pem"  # Substitua pelo caminho correto

async def send_metrics_to_grpc(metrics):
    # Carregar o certificado do servidor
    with open(CERTIFICATE_PATH, "rb") as cert_file:
        certificate = cert_file.read()
    
    # Criar credenciais SSL
    credentials = grpc.ssl_channel_credentials(certificate)

    # Conectar ao servidor gRPC usando HTTPS
    channel = grpc.aio.secure_channel("localhost:5001", credentials)
    stub = metric_service_pb2_grpc.MetricServiceStub(channel)

    # Preparar os dados da métrica
    request = metric_service_pb2.SaveMetricRequest(
        ip=metrics["Ip"],
        uso_de_cpu_porcentagem_core0=metrics["UsoDeCpuPorcentagemCore0"],
        uso_de_cpu_porcentagem_core1=metrics["UsoDeCpuPorcentagemCore1"],
        uso_de_memoria_porcentagem_total=metrics["UsoDeMemoriaPorcentagemTotal"],
        uso_de_memoria_porcentagem_cache=metrics["UsoDeMemoriaPorcentagemCache"],
        uso_de_memoria_bytes_total=metrics["UsoDeMemoriaBytesTotal"],
        uso_de_armazenamento_porcentagem_discoC=metrics["UsoDeArmazenamentoPorcentagemDiscoC"],
        uso_de_armazenamento_porcentagem_discoD=metrics["UsoDeArmazenamentoPorcentagemDiscoD"],
        uso_de_armazenamento_bytes_discoC=metrics["UsoDeArmazenamentoBytesDiscoC"],
    )

    # Enviar a métrica para o servidor gRPC
    response = await stub.SaveMetric(request)
    print("Métrica enviada com sucesso. ID:", response.id)

    await channel.close()


# Função para coletar as métricas
async def collectMetrics(interval):
    while True:
        # Coletando métricas conforme solicitado
        metrics = {
            "Ip": socket.gethostbyname(socket.gethostname()),  
            "UsoDeCpuPorcentagemCore0": psutil.cpu_percent(interval=1, percpu=True)[0],
            "UsoDeCpuPorcentagemCore1": psutil.cpu_percent(interval=1, percpu=True)[1] if psutil.cpu_count() > 1 else 0,
            "UsoDeMemoriaPorcentagemTotal": psutil.virtual_memory().percent,
            "UsoDeMemoriaPorcentagemCache": 0,  # Se desejar, pode ajustar conforme necessário
            "UsoDeMemoriaBytesTotal": psutil.virtual_memory().total,
            "UsoDeArmazenamentoPorcentagemDiscoC": psutil.disk_usage('/').percent,
            "UsoDeArmazenamentoPorcentagemDiscoD": 0,  # Adapte conforme o sistema, ou colete de outro disco
            "UsoDeArmazenamentoBytesDiscoC": psutil.disk_usage('/').used,
        }

        # Enviar métricas para o servidor gRPC
        await send_metrics_to_grpc(metrics)

        await asyncio.sleep(interval)


# Função para servir HTTP (sem alterações)
async def serveHttp(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Socket successfully created")

    sock.bind(("0.0.0.0", port))
    print("Socket binded to", port)

    sock.listen(5)
    print("Socket is listening")
    sock.setblocking(False)

    loop = asyncio.get_event_loop()

    while True:
        # Verifique se o arquivo existe, se não, crie-o
        if not os.path.exists("metrics.html"):
            with open("metrics.html", "w") as f:
                f.write("")  # Ou escreva algum conteúdo inicial, se necessário.

        f = open("metrics.html", "r")
        conn, addr = await loop.sock_accept(sock)
        print("Got connection from", addr)
        content = f.read()
        conn.send(content.encode())

        conn.close()
        f.close()

# Função principal para rodar as tarefas
async def main(interval):
    port = 9090
    tasks = await asyncio.gather(
        collectMetrics(interval),
        serveHttp(port),
    )


if __name__ == '__main__':
    if len(sys.argv) > 1:
        interval = sys.argv[1]
    else:
        interval = 3
    asyncio.run(main(int(interval)))
