json.user do
  json.extract! @user, :id, :email, :username, :status, :tag, :is_online, :created_at, :updated_at, :photo_url, :photo_id
  json.friends do
    @user.friends.each do |friend|
        json.set! friend.id do
          json.extract! friend, :id, :username, :status, :tag, :is_online, :photo_url, :photo_id
        end
    end
  end
end