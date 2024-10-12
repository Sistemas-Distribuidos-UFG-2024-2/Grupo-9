# Aula do Dia 11 de Outubro

### Mapa de Sistemas Distribuídos
- Arquitetura

    - cliente-servidor

    - peer-to-peer

- Processos

    - processos (programas em execução)

    - threads

    - serviços

- Comunicação

    - direta

        - comunicação interprocesso

            - message passing

            - socket

            - multicast

        - invocação remota
            
            - request-reply

            - remote process call

            - remote method invocation

        - broker

    - indireta (promove maior desacoplamento, tanto em espaço quanto em tempo)

        - group communication

        - pub/sub

        - message-queue

        - tuple-spaces

        - distributed shared memory

- Coordenação (exclusão mútua)


### Atividade para a próxima aula

Resolver os três primeiros [problemas de progração](./problemas\ de\ programacao-1.pdf)

Uma descrição da implementação de RPC pode ser encontrada [aqui](https://web.eecs.umich.edu/~mosharaf/Readings/RPC.pdf).

Uma descrição da arquitetura de RMI pode ser encontrada [aqui](https://www.gta.ufrj.br/ensino/eel879/trabalhos_vf_2017_2/rmi/arquitetura.html)
