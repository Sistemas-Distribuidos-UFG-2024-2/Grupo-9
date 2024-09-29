# Nameserver

Esse é um servidor de nomes feito em Lua. Ele funciona como um servidor DNS, porém simplificado.

## Funcionalidades:
- Adicionar um registro
Para adicionar um registro, é necessário enviar, via UDP, a seguinte mensagem para o ip e a porta do Nameserver:
```
POST /[nome do registro]?ip=[IP do registro]
```
- Recuperar um registro
Para recuperar um registro, é necessário enviar, via UDP, a seguinte mensagem para o ip e a porta do Nameserver:
```
GET /[nome do registro]
```
- Remover um registro
Para remover um registro, é necessário enviar, via UDP, a seguinte mensagem para o ip e a porta do Nameserver:
```
DELETE /[nome do registro]?ip=[IP do registro]
```
- Sincroniação de réplicas
O Nameserver faz uma sincronização com suas réplicas ao receber um novo registro ou ter um registro deletado.
## WIP
Esse serviço ainda está em desenvolvimento e precisa de muitas melhorias, como:
- A forma de sincronização entre réplicas ainda é bem arcaica, seria mais interessante estabelecer uma rotina que fizesse a sincronização ou talvez um serviço a parte (sidecar) que fizesse esse trabalho
- Algumas coisas poderiam ser movidas para coroutines (threads da linguagem Lua) para acelerar o processamento e evitar gargalos
- Falta autenticação
- Algumas partes do código estão estranhas
- Pouco comentário
