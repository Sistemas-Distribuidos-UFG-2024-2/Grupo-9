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

## Como rodar esse projeto

Esse projeto usa apenas Lua e suas bibliotecas padrão, então rodá-lo é bem simples.

### Usando Docker

É possível rodar esse projeto usando Docker da seguinte forma:

- Primeiro faça o build com `docker build -t nameserver:latest .`
- Rode a imagem com `docker run -p 3000:3000/udp -e NAMECACHE_PORT=3000 nameserver`

A aplicação estará disponível no seu localhost na porta 3000.

### Sem Docker

Para rodar a aplicação sem o Docker é necessário instalar algumas dependências:
- Lua5.3 (https://www.lua.org/download.html)
- LuaSocket (https://github.com/lunarmodules/luasocket)

Depois de instalar as dependências é só rodar `lua main.lua` na raíz deste projeto.

A porta padrão é a 3000, mas você pode mudar essa porta por meio da variável de ambiente `NAMECACHE_PORT`

