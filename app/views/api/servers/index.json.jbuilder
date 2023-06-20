@servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name, :owner_id
        json.default_channel server.channels.sort_by{|channel| channel.id}[0].id
        json.members do
            server.members.each do |member|
                json.set! member.id do
                    json.extract! member, :id, :username, :status, :tag, :is_online, :photo_url, :photo_id
                end
            end
        end
        json.channels do
            server.channels.each do |channel|
                json.set! channel.id do
                    json.extract! channel, :id, :name, :server_id, :channel_type, :is_voice
                end
            end 
        end
    end
end