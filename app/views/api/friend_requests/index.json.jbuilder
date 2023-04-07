@friend_requests.each do |friend_request|
    friend_id = friend_request.sender_id != @current_user.id ? friend_request.sender_id : friend_request.receiver_id
    json.set! friend_id do
        json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at
        json.dm_channel friend_request.dm_channel
    end
end
