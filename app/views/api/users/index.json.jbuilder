json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :status, :tag, :is_online
        end
    end
end