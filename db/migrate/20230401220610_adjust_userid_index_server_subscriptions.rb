class AdjustUseridIndexServerSubscriptions < ActiveRecord::Migration[7.0]
  def change
    remove_index :server_subscriptions, :user_id
    add_index :server_subscriptions, [:user_id, :server_id], unique: true
  end
end
