#!/bin/lua

local testing = require("testing")

local tests = testing.new_testing()

local ips = {"123.32.45.22","123.23.35.34","123.23.30.33","123.23.35.53","123.26.45.54","123.22.34.734","123.23.35.52"}
local names = {"teste1","teste2","teste3"}

tests:create_test(ips,"127.0.0.1",3000,names)

tests:run_test()
