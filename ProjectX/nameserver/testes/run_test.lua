#!/usr/bin/lua

local testing = require("testing")

local ip = "127.0.0.1"
local port = 3000
local ip_quant = 50
local name_quant = 20
local names = {}
local ips = {}
for i=1,ip_quant do
    ips[i] = "192.168.0."..i
end

for i=1,name_quant do
    names[i] = "teste"..i
end

local test = testing.new_testing()
test:create_test(ips,ip,port,names)

test:run_test()
