# Coletor de Métricas

Esse é o coletor de métricas, que deve estar instalado na(s) máquina(s) a ser(em) monitorada(s).

Este programa é feito em Python 3.10 e utiliza as seguintes bibliotecas:

- socket
- asyncio
- psutil
- sys

A aplicação funciona de forma assíncrona, servindo um servidor TCP na porta 9090 e coletando métricas de sistema de tempos em tempos. As métricas são inseridas no arquivo `metrics.html`, que é lido e enviado a qualquer cliente que se conecta à porta exposta.

Atualmente as métricas coletadas são:

- `uso_de_cpu_porcentagem(total)`: porcentagem de uso de CPU total (todos os núcleos)
- `uso_de_memoria_porcentagem(total)`: porcentagem de uso de memória RAM total

### Como rodar esse programa

Rode usando: `python3 main.py [intervalo-de-coleta-de-metricas]`

O `[intervalo-de-coleta-de-metricas]` especifica de quanto em quanto tempo (em segundos) o coletor deve atualizar as métricas. Esse valor não pode ser menor do que 1. O valor padrão (se o argumento não for passado) é 3.

### TO DO

Essa versão é apenas um protótipo para possibilitar o teste do sistema distribuído de forma mais dinâmica. Muitas coisas ainda precisam ser melhoradas e implementadas:

- A coleta de uso de CPU é uma operação bloqueante, aguardando 1 segundo afim de coletar o uso de CPU ao longo desse tempo e prover uma métrica mais adequada (sem isso a primeira métrica de CPU sempre retornaria 0), isso as vezes causa um pequeno delay na resposta de requests

- O servidor está implementado bem "na mão" usando socket TCP puro, sem implementar o HTTP propriamente dito

- O assíncronismo é feito usando asyncio, mas creio que possa ser reimplementado usando threading para uma melhor performance e paralelismo

- A resposta às requests é feita sem uso de uma função handler, com o código da resposta (leitura do arquivo `metrics.html` e envio do seu conteúdo) agregado ao código do servidor TCP

- Apenas duas métricas são coletadas no momento

- O programa requer Python 3.10, pois é a versão que eu tenho na minha máquina atualmente, algumas bibliotecas, como a asyncio, podem quebrar em versões mais recentes

