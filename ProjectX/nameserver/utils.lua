return {
new_utils = function()
    local utils = {}
    local socket = require("socket")

    function utils:multicast(content,ips,port)
        for i=1, #ips do
            local cod, err = socket:sendto(content,ips[i],port)
            if cod == nil then
                print(err)
            end
        end
        return 200
    end

    function utils:unicast(content,ip,port)
        local cod, err = socket:sendto(content,ip,port)
        if cod ~= nil then
            return 200
        end
        print(err)
        return 500
    end

    return utils
end
}
