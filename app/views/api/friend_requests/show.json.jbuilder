json.friend_request do
    friend_id = @friend_request.sender_id != @current_user.id ? @friend_request.sender_id : @friend_request.receiver_id
    json.friend_id friend_id
    json.set! friend_id do
      json.extract! @friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at
      json.dm_channel @dm_channel
    end
end

json.channel do 
    if @dm_channel
      json.extract! @dm_channel, :id, :name, :server_id, :channel_type, :is_voice
    end
end