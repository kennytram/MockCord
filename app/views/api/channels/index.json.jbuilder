@dm_channels.each do |dm_channel|
    json.set! dm_channel.id do
        json.extract! dm_channel, :id, :name, :server_id, :channel_type, :is_voice, :created_at, :updated_at
        json.dm_members do
            dm_channel.dm_members.each do |dm_member|
                json.set! dm_member.id do
                    json.extract! dm_member, :id, :username, :email, :created_at, :updated_at, :status, :tag, :is_online, :photo_url, :photo_id
                end
            end
        end
    end 
end 