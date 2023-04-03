json.channel do
    json.extract! @channel, :id, :name, :server_id, :channel_type, :is_voice, :created_at, :updated_at
end


json.messages do 
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :text, :author_id, :created_at, :updated_at
        end 
    end 
end