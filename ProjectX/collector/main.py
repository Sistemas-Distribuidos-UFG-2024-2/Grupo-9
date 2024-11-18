#!/usr/bin/python3
# -*- coding: utf-8 -*-

import socket
import asyncio
import psutil
import sys


async def collectMetrics(interval):
    while True:
        f = open("metrics.html","w")
        metrics = ""
        metrics = metrics + "uso_de_cpu_porcentagem(total): " + str(psutil.cpu_percent(interval=1)) + "\n"
        metrics = metrics + "uso_de_memoria_porcentagem(total): " + str(psutil.virtual_memory()[2]) + "\n"
        f.write(metrics)
        f.close()
        await asyncio.sleep(interval)

async def serveHttp(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print ("Socket successfully created")

    sock.bind(("localhost", port))
    print ("Socket binded to", port)

    sock.listen(5)
    print ("Socket is listening")
    sock.setblocking(False)

    loop = asyncio.get_event_loop()

    while True:
        f = open("metrics.html","r")
        conn, addr = await loop.sock_accept(sock)
        print ("Got connection from", addr)
        content = f.read()
        conn.send(content.encode())

        conn.close()
        f.close()

async def main(interval):
    port = 9090
    tasks = await asyncio.gather(
                collectMetrics(interval),
                serveHttp(port),
                )

if __name__ == '__main__':
    interval = sys.argv[1]
    asyncio.run(main(int(interval)))
