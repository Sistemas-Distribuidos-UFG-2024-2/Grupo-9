--
-- NAMESERVER SERVICE
--
local socket = require("socket")
local namecache = require("namecache")
local serv_hand = require("server_handler")
local copas = require("copas")

names = namecache.new_namecache()
local handler = serv_hand.new_server_handler()

function receive_request(skt)
  skt = copas.wrap(skt)
  while true do
      local data, err, port = skt:receivefrom(2048)
      if data then
        print("Received request from "..err..":"..port.." with data: "..data)
        handler:handle_request(data,err,port,skt,names)
      end
  end
end

local host = "*"
local port = os.getenv("PORT")
local rpc_port = os.getenv("RPC_PORT")
local tango_socket, tango_request = require('tango.server.copas_socket').new{port=rpc_port}

local server = assert(socket.udp())
assert(server:setsockname(host,port))

copas.addserver(server,receive_request,1)
copas.addserver(tango_socket,tango_request)

print("Start listening to requests:")
copas()
