class ChangeFriendToFriendRequestName < ActiveRecord::Migration[7.0]
  def change
    rename_table :friends, :friend_requests
  end
end
