json.user do
  json.extract! @user, :id, :email, :username, :status, :tag, :is_online, :created_at, :updated_at
  # json.servers do
  #   @user.servers.each do |server|
  #     json.extract! server, :id
  #   end
  # end
end