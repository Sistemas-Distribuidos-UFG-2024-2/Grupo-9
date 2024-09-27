#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>

#define MAX_ATTEMPTS 3
#define BUFFER_SIZE 1024
#define MCAST_GRP "224.1.1.1"
#define MCAST_PORT 5007
#define NUM_MESSAGES 20

#pragma comment(lib, "ws2_32.lib")

void log_message(const char* format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
    fflush(stdout);
}

int main() {
    WSADATA wsaData;
    SOCKET sock = INVALID_SOCKET;
    struct sockaddr_in localAddr, multicastAddr;
    char message[BUFFER_SIZE] = "Hello";
    char buffer[BUFFER_SIZE] = {0};
    int tries = 0;
    struct ip_mreq mreq;

    if (WSAStartup(MAKEWORD(2,2), &wsaData) != 0) {
        log_message("WSAStartup failed\n");
        return 1;
    }

    sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    if (sock == INVALID_SOCKET) {
        log_message("Could not create socket\n");
        WSACleanup();
        return 1;
    }

    // Configurar endereço local
    memset(&localAddr, 0, sizeof(localAddr));
    localAddr.sin_family = AF_INET;
    localAddr.sin_addr.s_addr = INADDR_ANY;
    localAddr.sin_port = htons(0);  // Use uma porta aleatória

    // Bind to the local address
    if (bind(sock, (struct sockaddr *)&localAddr, sizeof(localAddr)) == SOCKET_ERROR) {
        log_message("Bind failed with error: %d\n", WSAGetLastError());
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    // Configurar endereço multicast
    memset(&multicastAddr, 0, sizeof(multicastAddr));
    multicastAddr.sin_family = AF_INET;
    multicastAddr.sin_addr.s_addr = inet_addr(MCAST_GRP);
    multicastAddr.sin_port = htons(MCAST_PORT);

    log_message("Sending to multicast group %s on port %d\n", MCAST_GRP, MCAST_PORT);

    // Loop principal para enviar mensagens
    for (int msg = 0; msg < NUM_MESSAGES; msg++) {
        if (sendto(sock, message, strlen(message), 0, (struct sockaddr*)&multicastAddr, sizeof(multicastAddr)) == SOCKET_ERROR) {
            log_message("Send failed with error: %d\n", WSAGetLastError());
            break;
        }

        log_message("Sent message %d: %s\n", msg + 1, message);

        // Configurar para receber resposta
        fd_set readfds;
        struct timeval tv;
        FD_ZERO(&readfds);
        FD_SET(sock, &readfds);
        tv.tv_sec = 5;  // 5 segundos de timeout
        tv.tv_usec = 0;

        // Aguardar resposta
        int ready = select(sock + 1, &readfds, NULL, NULL, &tv);
        if (ready > 0) {
            int fromLen = sizeof(multicastAddr);
            int recv_len = recvfrom(sock, buffer, BUFFER_SIZE, 0, (struct sockaddr*)&multicastAddr, &fromLen);
            if (recv_len > 0) {
                buffer[recv_len] = '\0';
                log_message("Received response: %s\n", buffer);
            } else {
                log_message("recvfrom failed with error: %d\n", WSAGetLastError());
            }
        } else if (ready == 0) {
            log_message("No response received (timeout)\n");
        } else {
            log_message("select failed with error: %d\n", WSAGetLastError());
        }

        memset(buffer, 0, BUFFER_SIZE);
        Sleep(1000);
    }

    closesocket(sock);
    WSACleanup();
    return 0;
}