-- módulo de checagem de status
-- Esse módulo contém funções e estruturas de dados necessárias para a checagem de saúde das aplicações
--
return {

  new_checker = function()
    local copas = require("copas")
    local socket = require("socket")
    local checker = {}
    local coroutines = {}

    function checker:Receive(client)
        client:settimeout(0)
        local s, status = client:receive()
        if status == "timeout" then
            print("timeout!")
            coroutine.yield(client)
        end
        return s, status
    end

    function checker:checkHost(host, port)
        local client_get = assert(socket.udp4())
        local data = ""
        local status
        local s
        print("Enviando request GET para "..host..":"..port)
        local _, message = client_get:sendto("GET /health", host, port)
        if message ~= nil then print("Erro recebido ao enviar request: "..message) end
        while true do
            s, status = checker:Receive(client_get)
            if status ~= nil then
              print("status: "..status)
            end
            if s ~= nil then
                data = data..s
            end
            if string.find(data,"\n") then
                break
            end
        end
        client_get:close()
    end

    function checker:prepareCheck(entries)
        for i,entry in ipairs(entries) do
          for j, ip in ipairs(entry[i].ips) do
            local co = coroutine.create(function()
                checker:checkHost(ip[j],3000)
            end
            )
            table.insert(coroutines, co)
          end
        end
    end

    function checker:runCheck()
        while true do
            local n = #coroutines
            if n == 0 then
              print("nenhuma corotina!")
              break
            end
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

    return checker
  end
}
