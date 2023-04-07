json.user do
  json.extract! @user, :id, :email, :username, :status, :tag, :is_online, :created_at, :updated_at
  json.friends do
    @user.friends.each do |friend|
        json.set! friend.id do
          json.extract! friend, :id, :username, :status, :tag, :is_online
        end
    end
  end
end