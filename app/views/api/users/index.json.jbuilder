json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :status, :tag, :is_online
            # json.servers do
            #     json.array! user.servers.map(&:id)
            # end
            json.friends do
                user.friends.each do |friend|
                    json.set! friend.id do
                      json.extract! friend, :id, :username, :status, :tag, :is_online
                    end
                end
            end
        end
    end
end