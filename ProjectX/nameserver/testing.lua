#!/bin/lua

---
--- Nameserver testing script
---
return {
    local socket = require("socket")

    local namecache_host = "localhost"
    local namecache_port = 3000

    local client_get = assert(socket.udp())
    local client_delete = assert(socket.udp())

    local coroutines = {}

    function receive (client)
        client:timeout(0)
        local s, status = client:receive()
        if status == "timeout" then
            coroutine.yeld(client)
        end
        return s, status
    end

    function post_request (host, port, name, ip)
        local client_post = assert(socket.udp())
        client_post:sendto("POST /"..name.."?ip="..ip, host, port)
        while true do
            local s, status = receive(client_post)
            if status == "closed" then break end
        end
        client_post:close()
        print("Posted: "..name.." - "..ip.."\nReceived: "..s)
    end

    function get_request (host, post, name)
        local client_get = assert(socket.udp())
        client_get:sendto("GET /"..name, host, port)
        while true do
            local s, status = receive(client_get)
            if status == "closed" then break end
        end
        client_get:close()
        print("Get'd: "..name.." - "..ip.."\nReceived: "..s)
    end

    function delete_request (host, port, name, ip)
        local client_delete = assert(socket.udp())
        client_delete:sendto("DELETE /"..name.."?ip="..ip, host, port)
        while true do
            local s, status = receive(client_delete)
            if status == "closed" then break end
        end
        client_delete:close()
        print("Deleted: "..name.." - "..ip.."\nReceived: "..s)
    end

    function create_test(ips,host,port,names)
        local co = coroutine.create(function()
            )
    end
}

