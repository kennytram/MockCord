json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :status, :tag, :is_online
            # json.servers do
            #     json.array! user.servers.map(&:id)
            # end
        end
    end
end