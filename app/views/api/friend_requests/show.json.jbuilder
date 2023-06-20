json.friend_request do
  friend_request ||= @friend_request
  friend_id = friend_request.sender_id != current_user.id ? friend_request.sender_id : friend_request.receiver_id
  json.friend_id friend_id
  json.set! friend_id do
    dm_channel ||= @dm_channel
    json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at
    json.dm_channel dm_channel
  end
end

json.channel do 
  dm_channel ||= @dm_channel
  if dm_channel
    json.extract! dm_channel, :id, :name, :server_id, :channel_type, :is_voice
    json.dm_members do
      dm_channel.dm_members.each do |dm_member|
        json.set! dm_member.id do
          json.extract! dm_member, :id, :username, :email, :created_at, :updated_at, :status, :tag, :is_online, :photo_url, :photo_id
        end
      end
    end
  end
end