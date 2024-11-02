-- publisher
local socket = require("socket")

local client = socket.tcp4()
local input
local semaforo
local msg_excedente
local j = 1

while true do
    assert(client:connect("127.0.0.1",3000),"não foi possível se conectar")
    if msg_excedente ~= nil then
        assert(client:send(msg_excedente.."\n"))
        msg_excedente = nil
    else
        --print("Escreva uma mensagem: ")
        --input = io.read("*l")
        input = j
        assert(client:send(input.."\n"))
    end
    while true do
        print("esperando resposta")
        semaforo = client:receive()
        if semaforo == "0" then
            client:close()
            print("liberado para escrever")
            break
        elseif semaforo == "1" then
            msg_excedente = client:receive()
        end
    end
    j = j+1
    if j > 10000000 then
        j = 1
    end
end
