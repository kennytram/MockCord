json.server do
    json.extract! @server, :id, :name, :owner_id, :invite_token
    json.defaultChannel @server.channels.sort_by{|channel| channel.id}[0].id
    json.members do
        @server.members.each do |member|
            json.set! member.id do
                json.extract! member, :id, :username, :status, :tag, :is_online
            end
        end
    end
    json.channels do
        @server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :id, :name, :server_id, :channel_type, :is_voice
            end
        end 
    end    
end


json.users do 
    @server.members.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username, :status, :tag, :is_online
        end
    end
end

