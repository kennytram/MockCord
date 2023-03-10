json.dm do
    json.extract! @dm, :id, :name, :user_id, :other_user_id
end

json.messages do 
    @dm.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :text, :author_id, :created_at, :updated_at
        end 
    end 
end

json.users do
    json.set! @current_user.id do
        json.extract! @current_user, :id, :username
    end
    json.set! @other_user.id do
        json.extract! @other_user, :id, :username
    end
end