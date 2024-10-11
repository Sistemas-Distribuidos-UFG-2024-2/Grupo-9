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
                print("Inserted entry "..namecache.names[i][1]..": "..ip)
                if namecache:sync_with_replicas("POST",entry) == 200 and namecache:get_entry(entry[1],nil) == 404 then
                    print("Sync with other replicas done!")
                end
                return 200,name,ip
            end
        end
        table.insert(namecache.names, entry)
        print("Inserted entry "..entry[1]..": "..entry[2])
        if namecache:sync_with_replicas("POST",entry) == 200  then
            print("Sync with other replicas done!")
        end
        return 200,entry
    end

    function namecache:remove_entry(name,ip)
        local entry = {name,ip}
        for i,v in ipairs(namecache.names) do
            if v[1] == name then
                for k=1, #namecache.names[i] do
                    if namecache.names[i][k] == ip then
                        table.remove(namecache.names[i],k)
                        if namecache:sync_with_replicas("DELETE",entry) == 200 and namecache:get_entry(entry[1],nil) == 404 then
                            print("Sync with other replicas done!")
                        end
                        return 200,name,ip
                    end
                end
                table.remove(namecache.names,i)
                if namecache:sync_with_replicas("DELETE",entry) == 200 and namecache:get_entry(entry[1],nil) == 404 then
                    print("Sync with other replicas done!")
                end
                return 200,name,ip
            end
            return 404
        end
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
                    entry = namecache.names[i][ math.random( #namecache.names[i]) ]
                end
            end
        end
        if (entry ~= nil) then
            return 200,entry
        end
        return 404
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
