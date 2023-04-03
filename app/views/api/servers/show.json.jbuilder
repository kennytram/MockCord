json.server do
    json.extract! @server, :id, :name, :owner_id, :invite_token
    json.defaultChannel @server.channels[0].id
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :server_id, :channel_type, :is_voice
            
        end
    end 
end

json.users do 
    @server.members.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username, :status, :tag, :is_online
            json.servers do
                json.array! member.servers.map(&:id)
            end
        end
    end
end