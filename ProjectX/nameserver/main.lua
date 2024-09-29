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
while true do

    local data, client_ip, client_port = server:receivefrom(1024);
    if data then
        handler:handle_request(data,client_ip,client_port,server,names)
    end
end
