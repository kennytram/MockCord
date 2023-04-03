json.channels do
    @dm_channels.each do |dm_channel|
        json.set! dm_channel.id do
            json.extract! dm_channel, :id, :name, :server_id, :channel_type, :is_voice, :created_at, :updated_at
        end 
    end 
end