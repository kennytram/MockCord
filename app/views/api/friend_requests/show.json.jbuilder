
json.set! @friend_request.id do
    json.extract! @friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at
    json.set! dm_channel @dm_channel
end



json.extract! @friend_request, :id, :sender_id, :receiver_id, :status, :created_at, :updated_at

