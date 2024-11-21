# API Gateway com NestJS
==========================

## Descrição do Projeto

Este projeto implementa um API Gateway usando o framework NestJS. O objetivo é fornecer uma camada de entrada unificada para múltiplos serviços, facilitando a gestão de requisições e respostas.

## Funcionalidades

* **Descoberta de Serviços:** Utiliza um serviço de descoberta para localizar os endereços IP dos serviços downstream.
* **Encaminhamento de Requisições:** Encaminha requisições HTTP para os serviços correspondentes com base no nome do serviço e no caminho da requisição.
* **Suporte a Métodos HTTP:** Suporta os métodos GET, POST e DELETE.
* **Gestão de Erros:** Trata erros e fornece respostas adequadas em caso de falhas.
* **Coleta de Métricas:** Coleta e armazena métricas de uso de CPU e memória em intervalos regulares.
* **Histórico de Métricas:** Permite recuperar o histórico de métricas por um período de tempo específico.
* **Resiliência na Coleta de Métricas:** O serviço de coleta de métricas é resiliente a falhas temporárias de conexão, tentando se reconectar de forma automática antes de reportar um erro.


## Tecnologias Utilizadas

*   **NestJS:** Framework Node.js para construir aplicações server-side escaláveis.
*   **Axios:** Biblioteca para fazer requisições HTTP no Node.js.
*   **NestJS Config:** Módulo para gerenciar configurações no NestJS.
*   **NestJS Axios:** Módulo para integração do Axios com o NestJS.

## Instalação e Execução

### Pré-requisitos

*   Node.js (versão 14 ou superior)
*   NPM (versão 6 ou superior) ou Yarn
*   NestJS CLI (opcional, para criação de novos projetos)

### Passos para Execução

1. 'npm install' ou 'yarn install'

2. 'npm run start' ou 'yarn start'

### Variáveis de Ambiente (Modificar para testes)

- `NOME_SERVER_URL`: URL do servidor de descoberta de serviços.
- `METRICS_HOST`: Host do servidor de métricas.
- `METRICS_PORT`: Porta do servidor de métricas..
- `METRICS_POLL_INTERVAL`: Intervalo em milissegundos para coletar as métricas.
- `METRICS_TIMEOUT`: Timeout em milissegundos para a conexão com o servidor de métricas.
- `METRICS_HISTORY_LIMIT`: Número máximo de métricas a serem armazenadas no histórico.
- `METRICS_MAX_RETRIES`: Número máximo de tentativas de conexão com o servidor de métricas.
- `METRICS_RETRY_DELAY`: Tempo de espera em milissegundos entre as tentativas de conexão.