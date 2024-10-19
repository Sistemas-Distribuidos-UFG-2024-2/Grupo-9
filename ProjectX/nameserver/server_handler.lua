--
-- REQUEST HANDLER
--
return {

new_server_handler = function()
    local server_handler = {}

    function server_handler:handle_request(request,client_ip,client_port,server,namecache)
        local ip, name -- A aquisição dos valores dessas variáveis está muito complicado e enrolado nessa função, isso deve ser movido para uma função adicional
        if (string.find(request,"GET")) then
            local i,_ = string.find(request,"/")
            name = string.gsub(string.sub(request,i+1,-1),"\n","")
            local r,entry = namecache:get_entry(name)
            if r == 404 then
                server:sendto(r.."\n",client_ip,client_port)
                return r
            end
            server:sendto(r.." "..entry.."\n",client_ip,client_port)
            return r
        elseif (string.find(request,"POST")) then
            local i,_ = string.find(request,"/")
            local j,_ = string.find(request,"?")
            name = string.gsub(string.sub(request,i+1,j-1),"\n","")
            ip = string.gsub(string.sub(request,j+4,-1),"\n","")
            local r,entry = namecache:add_entry(name,ip)
            server:sendto(r.." "..entry[1].."\n",client_ip,client_port)
            return r
        elseif (string.find(request,"DELETE")) then
            local i,_ = string.find(request,"/")
            local j,_ = string.find(request,"?")
            if j ~= nil then
                name = string.gsub(string.sub(request,i+1,j-1),"\n","")
                ip = string.gsub(string.sub(request,j+4,-1),"\n","")
            else
                name = string.gsub(string.sub(request,i+1,-1),"\n","")
            end
            local r,_ = namecache:remove_entry(name,ip)
            server:sendto(r.."\n",client_ip,client_port)
            return r
        else
            print("Bad request: "..request)
            server:sendto("400 Bad Request\n",client_ip,client_port)
        end
    end

    return server_handler
end
}
