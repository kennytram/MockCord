json.user do
  json.extract! @user, :id, :email, :username, :status, :tag, :is_online, :created_at, :updated_at
end

