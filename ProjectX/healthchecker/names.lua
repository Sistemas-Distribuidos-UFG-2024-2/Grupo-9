-- módulo de nomes
-- Esse módulo contém funções e estruturas de dados que lidam com a aquisição de IPs a partir de nomes
return {
  new_names = function()
    local Names = {
      entries = {
        entry = {
          name = nil,
          ips = {}
        }
      }
    }

    function Names:getEntry(entry)
      if #self.entries > 0 then
        for i,entries in ipairs(self.entries) do
          if entries[i].name == entry[1] then
            return 200, entries[i]
          end
        end
        return 404
      end
      return 404, "Nothing in cache"
    end

    function Names:setEntry(entry)
      for i,entries in ipairs(self.entries) do
        if Names:getEntry(entry) ~= 404 then
          return 401, "Registro já existe"
        else
          self.entries[i].name=entry[1]
          self.entries[i].ips={}
        end
      end
      return 200
    end

    function Names:deleteEntry(entry)
      for i, entries in ipairs(Names) do
        if entries.name == entry.name then
          table.remove(Names,i)
          return 200
        end
      end
      return 404
    end

    function Names:iterator(f)
      local result = {}
      for entry in ipairs(self.entries) do
        table.insert(result,f(entry))
      end
      return result
    end

    function Names:getIpsForEntries(ns_connection,util)
      for i, entry in ipairs(self.entries) do
        entry[i].ips = util:getIpList(ns_connection, entry[i].name)
      end
      return 200
    end

    function Names:getNamesFromNameServer(ns_connection,util)
      local entries = util:getNameList(ns_connection)
      for _, entry in ipairs(entries) do
          if Names:setEntry(entry) == 401 then
            print("Nome: "..entry[1].." já presente")
          end
      end
      return 200
    end

    return Names
  end
}
