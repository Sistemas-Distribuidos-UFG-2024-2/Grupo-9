# API Gateway com NestJS
==========================

## Descrição do Projeto

Este projeto implementa um API Gateway usando o framework NestJS. O objetivo é fornecer uma camada de entrada unificada para múltiplos serviços, facilitando a gestão de requisições e respostas.

## Funcionalidades

*   **Descoberta de Serviços:** Utiliza um serviço de descoberta para localizar os endereços IP dos serviços downstream.
*   **Encaminhamento de Requisições:** Encaminha requisições HTTP para os serviços correspondentes com base no nome do serviço e no caminho da requisição.
*   **Suporte a Métodos HTTP:** Suporta os métodos GET, POST e DELETE.
*   **Gestão de Erros:** Trata erros e fornece respostas adequadas em caso de falhas.

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

### Variáveis de Ambiente ( Modificar para testes)
NOME_SERVER_URL: URL do servidor de descoberta de serviços.