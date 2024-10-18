#!/bin/lua

---
--- Nameserver testing script
---
return {

new_testing = function ()
    local socket = require("socket")

    local testing = {}

    local coroutines = {}

    function testing:receive (client)
        print("Entrando no testing:receive")
        client:settimeout(0)
        local s, status = client:receive()
        print(s)
        if status == "timeout" then
            print("Timeout recebido, deixando a corotina")
            coroutine.yield(client)
        end
        print("Retornando dados")
        return s, status
    end

    function testing:post_request (host, port, name, ip)
        local client_post = assert(socket.udp())
        local data = ""
        print("Enviando request")
        local _, message = client_post:sendto("POST /"..name.."?ip="..ip, host, port) -- a conexão tá sendo recusada por algum motivo
        if message ~= nil then print(message) end
        while true do
            print("Recebendo dados")
            local s, status = testing:receive(client_post)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then
                print("Conexão fechada")
                break
            end
            break -- sem esse break o negócio loopa para sempre, mas provavelmente tem a ver com o bug acima
        end
        print("Sai do loop do post")
        client_post:close()
        print("Posted: "..name.." - "..ip.."\nReceived: "..data)
    end

    function testing:get_request (host, port, name)
        local client_get = assert(socket.udp())
        local data = "response: "
        client_get:sendto("GET /"..name, host, port)
        while true do
            local s, status = testing:receive(client_get)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then break end
        end
        client_get:close()
        print("Get'd: "..name.."\nReceived: "..data)
    end

    function testing:delete_request (host, port, name, ip)
        local client_delete = assert(socket.udp())
        local data = "response: "
        client_delete:sendto("DELETE /"..name.."?ip="..ip, host, port)
        while true do
            local s, status = testing:receive(client_delete)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then break end
        end
        client_delete:close()
        print("Deleted: "..name.." - "..ip.."\nReceived: "..data)
    end

    function testing:create_test(ips,host,port,names)
        for i=1, #names do
            for j=1, #ips do
                local co = coroutine.create(function()
                    testing:post_request(host, port, names[i], ips[j])
                end
                )
                table.insert(coroutines, co)
                print("coroutine adicionada.")
            end
        end
    end

    function testing:run_test()
        while true do
            local n = #coroutines
            if n == 0 then break end
            local connections = {}
            for i=1,n do
                print("Resumindo corotina:"..i)
                local status, res = coroutine.resume(coroutines[i])
                if not res then
                    print("Removendo corotina:"..i)
                    table.remove(coroutines,i)
                    break
                else
                    table.insert(connections, res)
                end
            end
            if #connections == n then
                socket.select(connections)
            end
        end
    end

    return testing
end

}

