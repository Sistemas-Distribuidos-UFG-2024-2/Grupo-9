#!/bin/lua

---
--- Nameserver testing script
---
return {

new_testing = function ()
    local socket = require("socket")

    local namecache_host = "localhost"
    local namecache_port = 3000

    local coroutines = {}

    local function receive (client)
        client:timeout(0)
        local s, status = client:receive()
        if status == "timeout" then
            coroutine.yield(client)
        end
        return s, status
    end

    local function post_request (host, port, name, ip)
        local client_post = assert(socket.udp())
        local data = "response: "
        client_post:sendto("POST /"..name.."?ip="..ip, host, port)
        while true do
            local s, status = receive(client_post)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then break end
        end
        client_post:close()
        print("Posted: "..name.." - "..ip.."\nReceived: "..data)
    end

    local function get_request (host, port, name)
        local client_get = assert(socket.udp())
        local data = "response: "
        client_get:sendto("GET /"..name, host, port)
        while true do
            local s, status = receive(client_get)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then break end
        end
        client_get:close()
        print("Get'd: "..name.."\nReceived: "..data)
    end

    local function delete_request (host, port, name, ip)
        local client_delete = assert(socket.udp())
        local data = "response: "
        client_delete:sendto("DELETE /"..name.."?ip="..ip, host, port)
        while true do
            local s, status = receive(client_delete)
            if s ~= nil then
                data = data..s
            end
            if status == "closed" then break end
        end
        client_delete:close()
        print("Deleted: "..name.." - "..ip.."\nReceived: "..data)
    end

    local function create_test(ips,host,port,names)
        for i=1, #names do
            for j=1, #ips do
                local co = coroutine.create(function()
                    post_request(host, port, names[i], ips[j])
                end
                )
            end
        end
    end
end
}

