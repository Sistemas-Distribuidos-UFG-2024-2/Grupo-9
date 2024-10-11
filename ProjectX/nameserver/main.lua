--
-- NAMESERVER SERVICE
--
local socket = require("socket")
local namecache = require("namecache")
local serv_hand = require("server_handler")

local host = "*"
local port = 3000

local server = assert(socket.udp())
assert(server:setsockname(host,port))

local names = namecache.new_namecache()
local handler = serv_hand.new_server_handler()

assert(server:settimeout(0.01))
print("Start listening to requests:")
while true do
    local data, client_ip, client_port = server:receivefrom(1024);
    if data then
        print("Received request from "..client_ip..":"..client_port.." with data: "..data)
        handler:handle_request(data,client_ip,client_port,server,names)
    end
end
