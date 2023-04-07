json.channel do
    json.extract! @channel, :id, :name, :server_id, :channel_type, :is_voice, :created_at, :updated_at
    json.dm_members do
        @channel.dm_members.each do |dm_member|
            json.set! dm_member.id do
                json.extract! dm_member, :id, :username, :email, :created_at, :updated_at
            end
        end
    end
end


json.messages do 
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :text, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
        end 
    end 
end