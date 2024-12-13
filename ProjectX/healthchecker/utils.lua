-- utilitários
--

return {
  new_utils = function()
    local Utils = {}
    local tango = require("tango")

    function Utils:getIpList(namecache,entry)
      local _, ip_list = namecache:get_all_entries(entry[1])
      if ip_list == 404 then
        return 404, "No names in cache"
      end
      return ip_list
    end

    function Utils:getNameList(namecache)
      local _, name_list = namecache:get_all_names()
      local entry_list = {}
      if name_list == 404 then
        return 404, "No names in cache"
      end
      for _, name in pairs(name_list) do
        table.insert(entry_list,{name,ips={}})
      end
      return entry_list
    end

    return Utils
  end
}
