--
-- HEALTH CHECKER SERVICE
--
local checker = require("checker")
local names = require("names")
local utils = require("utils")
local tango = require("tango")

local nameServerIp = os.getenv("NAME_SERVER_IP") or "127.0.0.1"
local nameServerPort = tonumber(os.getenv("NAME_SERVER_PORT")) or 3001
local delay = os.getenv("DELAY") or "5"

local name_list = names.new_names()
local check = checker.new_checker()
local util = utils.new_utils()

while true do
  print("Criando RPC")
  local connection = require("tango.client.socket").connect({address=nameServerIp, port=nameServerPort})
  local namecache = tango.ref(connection.names)
  print("Populando lista de hosts")
  name_list:getNamesFromNameServer(namecache,util)
  name_list:getIpsForEntries(namecache,util)
  local entries = {}
  print(name_list:getEntry({"name1"}))
  for i, entry in ipairs(name_list.entries) do
    print(i)
    print(entry[i])
    entries[i] = entry
  end
  print("Preparando checagem de hosts")
  check:prepareCheck(entries)

  print("Rodando checagem de hosts")
  check:runCheck()

  print("Checagem finalizada, esperando delay: "..delay.." segundos")
  os.execute("sleep "..delay)
end
