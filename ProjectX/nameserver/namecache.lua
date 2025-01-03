--
-- NAMECACHE
--
return {

--Table structure: {["name","ip"],[...]}
new_namecache = function()
    local namecache = {}
    local namecache_port = os.getenv("NAMECACHE_PORT")
    namecache.names = {}
    local utils = require("utils")

    function namecache:add_entry(name, ip)
        local entry = {name,ip}
        if namecache:get_entry(name,ip) == 200 then
            return 200,entry
        end
        for i,v in ipairs(namecache.names) do
            if v[1] == name then
                table.insert(namecache.names[i],ip)
                print("Inserted entry "..namecache.names[i][1]..": "..ip..".")
                if namecache:sync_with_replicas("POST",entry) == 200 and namecache:get_entry(entry[1],nil) == 404 then
                    print("Sync with other replicas done!")
                end
                return 200,entry
            end
        end
        table.insert(namecache.names, entry)
        print("Inserted entry "..entry[1]..": "..entry[2]..".")
        if namecache:sync_with_replicas("POST",entry) == 200  then
            print("Sync with other replicas done!")
        end
        return 200,entry
    end

    function namecache:remove_entry(name,ip)
        local entry = {name,ip}
        for i=1, #namecache.names do
            if namecache.names[i][1] == name then
                if ip ~= nil then
                    for k=2, #namecache.names[i] do
                        if namecache.names[i][k] == ip then
                            table.remove(namecache.names[i],k)
                            print("Deleted entry "..entry[1]..": "..entry[2]..".")
                            if namecache:sync_with_replicas("DELETE",entry) == 200 then
                                print("Sync with other replicas done!")
                            end
                            if #namecache.names[i] < 2 then
                                table.remove(namecache.names,i)
                                print("Deleted "..entry[1].." from cache because it had no entries left.")
                            end
                            return 200,name,ip
                        end
                    end
                else
                    table.remove(namecache.names,i)
                    print("Deleted all entries of "..entry[1].." from cache.")
                    if namecache:sync_with_replicas("DELETE",entry) == 200 then
                        print("Sync with other replicas done!")
                    end
                    return 200,name
                end
            end
        end
        return 404
    end

    function namecache:get_entry(name,ip)
        local entry
        if ( #namecache.names == 0) then
            return 404
        end
        if ip ~= nil then
            for i=1,#namecache.names do
                if namecache.names[i][1] == name then
                    for j=2,#namecache.names[i] do
                        if namecache.names[i][j] == ip then
                            entry = namecache.names[i][j]
                            return 200,entry
                        end
                    end
                    return 404
                end
            end
        else
            for i,v in ipairs(namecache.names) do
                if v[1] == name then
                    entry = namecache.names[i][math.random(2,#namecache.names[i])]
                end
            end
        end
        if (entry ~= nil) then
            print("Returning entry "..name..": "..entry..".")
            return 200,entry
        end
        return 404
    end

    function namecache:get_all_names()
        local all_names = {}
        if ( #namecache.names == 0) then
            return 404
        end
        for i,v in ipairs(namecache.names) do
          table.insert(all_names,v[1])
        end
        return 200, all_names
    end

    function namecache:get_all_entries(name)
        local entry = {}
        if ( #namecache.names == 0) then
            return 404
        end
        for i,v in ipairs(namecache.names) do
            if v[1] == name then
                entry = namecache.names[i]
            end
        end
        if (entry ~= nil) then
            return 200,entry
        end
        return 404
    end

    function namecache:sync_with_replicas(mode,entry)
        local status, namecache_replicas = namecache:get_all_entries("namecache")
        if status == 404 then
            return 404
        end
        if #namecache_replicas < 3 then
            return 404
        end
        local post_request = mode.." /"..entry[1].."?"..entry[2]
        if utils:multicast(post_request,namecache_replicas,namecache_port) == 200 then
            return 200
        else
            return 500
        end
    end

    return namecache
end

}
