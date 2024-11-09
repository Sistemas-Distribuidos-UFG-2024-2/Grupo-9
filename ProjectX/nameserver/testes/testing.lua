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
        client:settimeout(0)
        local s, status = client:receive()
        if status == "timeout" then
            print("timeout!")
            coroutine.yield(client)
        end
        return s, status
    end

    function testing:post_request (host, port, name, ip)
        local client_post = assert(socket.udp4())
        local data = ""
        print("Enviando request POST para "..host..":"..port)
        local _, message = client_post:sendto("POST /"..name.."?ip="..ip, host, port)
        if message ~= nil then print("Erro recebido ao enviar request: "..message) end
        while true do
            local s, status = testing:receive(client_post)
            if s ~= nil then
                data = data..s
            end
            if string.find(data,"\n") then
                break
            end
        end
        client_post:close()
        print("Posted: "..name.." - "..ip.." Received: "..data)
    end

    function testing:get_request (host, port, name)
        local client_get = assert(socket.udp4())
        local data = ""
        print("Enviando request GET para "..host..":"..port)
        local _, message = client_get:sendto("GET /"..name, host, port)
        if message ~= nil then print("Erro recebido ao enviar request: "..message) end
        while true do
            local s, status = testing:receive(client_get)
            if s ~= nil then
                data = data..s
            end
            if string.find(data,"\n") then
                break
            end
        end
        client_get:close()
        print("Get'd: "..name.." Received: "..data)
    end

    function testing:delete_request (host, port, name, ip)
        local client_delete = assert(socket.udp4())
        local data = ""
        print("Enviando request DELETE para "..host..":"..port)
        local _, message = client_delete:sendto("DELETE /"..name.."?ip="..ip, host, port)
        if message ~= nil then print("Erro recebido ao enviar request: "..message) end
        while true do
            local s, status = testing:receive(client_delete)
            if s ~= nil then
                data = data..s
            end
            if string.find(data,"\n") then
                break
            end
        end
        client_delete:close()
        print("Deleted: "..name.." - "..ip.." Received: "..data)
    end

    function testing:create_test(ips,host,port,names)
        for i=1, #names do
            for j=1, #ips do
                local co = coroutine.create(function()
                    testing:post_request(host, port, names[i], ips[j])
                end
                )
                table.insert(coroutines, co)
            end
        end
        for i=1, #names do
            local co = coroutine.create(function()
                testing:get_request(host, port, names[i])
            end
            )
            table.insert(coroutines, co)
        end
        for i=1, #names do
            for j=1, #ips do
                local co = coroutine.create(function()
                    testing:delete_request(host, port, names[i], ips[j])
                end
                )
                table.insert(coroutines, co)
            end
        end
    end

    function testing:run_test()
        while true do
            local n = #coroutines
            if n == 0 then break end
            local connections = {}
            for i=1,n do
                local status, res = coroutine.resume(coroutines[i])
                if not res then
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

