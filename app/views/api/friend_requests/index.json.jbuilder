@friend_requests.each do |friend_request|
    json.set! friend_request.id do
        json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at
        json.dm_channel friend_request.dm_channel.id
    end
end