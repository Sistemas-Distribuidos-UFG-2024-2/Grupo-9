#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>
#include <ws2tcpip.h>

#define MAX_ATTEMPTS 3
#define BUFFER_SIZE 1024
#define NUM_PORTS 3
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
    struct sockaddr_in server;
    char message[BUFFER_SIZE] = "Hello";
    char buffer[BUFFER_SIZE] = {0};
    int ports[] = {8888, 8889, 8890};  // Array of ports to try

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2,2), &wsaData) != 0) {
        log_message("WSAStartup failed\n");
        return 1;
    }

    server.sin_addr.s_addr = inet_addr("127.0.0.1");
    server.sin_family = AF_INET;

    int attempts = 0;
    int connected = 0;

    while (attempts < MAX_ATTEMPTS && !connected) {
        for (int i = 0; i < NUM_PORTS; i++) {
            // Create socket
            sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
            if (sock == INVALID_SOCKET) {
                log_message("Could not create socket\n");
                WSACleanup();
                return 1;
            }

            server.sin_port = htons(ports[i]);

            // Connect to server
            if (connect(sock, (struct sockaddr *)&server, sizeof(server)) == SOCKET_ERROR) {
                log_message("Connection failed on port %d. Retrying...\n", ports[i]);
                closesocket(sock);
                continue;
            }

            log_message("Connected to server on port %d\n", ports[i]);
            connected = 1;
            break;
        }

        attempts++;
        if (!connected && attempts < MAX_ATTEMPTS) {
            log_message("Attempt %d failed. Retrying in 1 second...\n", attempts);
            Sleep(1000);  // Sleep for 1 second
        }
    }

    if (!connected) {
        log_message("Max attempts reached. Exiting.\n");
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    // Send 20 messages
    for (int msg = 0; msg < NUM_MESSAGES; msg++) {
        // Send message
        if (send(sock, message, strlen(message), 0) == SOCKET_ERROR) {
            log_message("Send failed for message %d\n", msg + 1);
            break;
        }

        log_message("Sent message %d: %s\n", msg + 1, message);

        // Receive response
        int bytes_received = recv(sock, buffer, BUFFER_SIZE, 0);
        if (bytes_received == SOCKET_ERROR) {
            log_message("Recv failed for message %d\n", msg + 1);
            break;
        }

        buffer[bytes_received] = '\0';  // Ensure null-termination
        log_message("Received response for message %d: %s\n", msg + 1, buffer);

        if (strcmp(buffer, "World") != 0) {
            log_message("Unexpected response for message %d. Exiting.\n", msg + 1);
            break;
        }

        memset(buffer, 0, BUFFER_SIZE);  // Clear buffer for next message
    }

    log_message("Finished sending messages.\n");

    closesocket(sock);
    WSACleanup();
    return 0;
}