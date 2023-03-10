@servers.each do |server|
    json.set! server.id do
        json.extract! server, :id, :name, :owner_id
        json.defaultChannel server.channels[0].id
    end
end

