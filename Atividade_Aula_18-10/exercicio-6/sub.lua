-- subscriber
local socket = require("socket")

local client = socket.tcp4()
local msg = "sub"
local _, err = client:connect("127.0.0.1",3000)
if err then
    print(err)
else
    print("conectado")
end

_, err = client:send("sub\n")
if err then
    print(err)
else
    print("inscrito")
end

while true do
    msg, err = client:receive()
    if err == "closed" then
        break
    end
    print(msg)
end
