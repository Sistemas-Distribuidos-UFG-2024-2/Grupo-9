#!/usr/bin/lua

local testing = require("testing")

local ip = "127.0.0.1"
local port = 3000
local n = 30
local m = 10
local names = {}
local ips = {}
for i=1,n do
    ips[i] = "192.168.0."..i
end

for i=1,m do
    names[i] = "teste"..i
end

local test = testing.new_testing()
test:create_test(ips,ip,port,names)

test:run_test()
