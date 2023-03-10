json.server do
    json.extract! @server, :id, :name, :owner_id
    json.defaultChannel @server.channels[0].id
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :server_id
        end 
    end 
end



json.users do 
    @server.members.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username
        end
    end
end