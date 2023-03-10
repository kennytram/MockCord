@dms.each do |dm|
    json.set! dm.id do
        json.extract! dm, :id, :name, :other_user_id, :user_id 
    end
end

json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username
        end
    end
end