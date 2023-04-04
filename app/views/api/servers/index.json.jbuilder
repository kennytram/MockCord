@servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name, :owner_id
        json.defaultChannel server.channels[0].id
        json.members do
            server.members.each do |member|
                json.set! member.id do
                    json.extract! member, :id, :username, :status, :tag, :is_online
                end
            end
        end
    end
end