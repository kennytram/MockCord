class RenameColumnsFriendRequests < ActiveRecord::Migration[7.0]
  def change
    rename_column :friend_requests, :user1_id, :sender_id
    rename_column :friend_requests, :user2_id, :receiver_id
  end
end
