class FixColumnDm < ActiveRecord::Migration[7.0]
  def change
    remove_column :dm_subscriptions, :direct_messages_id
    add_reference :dm_subscriptions, :direct_message
  end
end
