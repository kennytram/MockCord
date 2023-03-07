json.server do
    json.extract! @server, :id, :name, :owner_id
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :server_id
        end 
    end 
end
