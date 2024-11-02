-- servidor do buffer compartilhado
local socket = require("socket")

local buffer = ""
local buffer_size = 8
local subscribers = {}
local msg
local msg_excedente
local buffer_empty

local server = socket.bind("*",3000)
server:settimeout(0.01)

while true do
    local client, err = server:accept()
    if err then
        --print(err)
    else
        msg, err = client:receive()

        if msg ~= nil and string.find(msg,"sub") then
            print("client inscrito!")
            table.insert(subscribers,client)
        elseif not err then
            print("era um pub")
            buffer_empty = buffer_size - #buffer
            if #msg > buffer_empty then
                print("mensagem maior que o buffer")
                print("cortando parte excedente e retornando para o publisher")
                buffer = buffer..string.sub(msg,1,buffer_empty)
                msg_excedente = string.sub(msg,buffer_empty+1,#msg)
                client:send("1\n")
                client:send(msg_excedente.."\n")
                buffer = ""
                client:send("0\n")
            else
                buffer = buffer..msg
                print("escrevi "..msg.." no buffer")
                client:send("0\n")
            end
        end
    end
    if buffer ~= "" then
        for i=1, #subscribers do
            subscribers[i]:send(buffer.."\n")
        end
        buffer = ""
    end
end
