class DeleteTableDmAndDmsubs < ActiveRecord::Migration[7.0]
  def change
    drop_table :dm_subscriptions
    drop_table :direct_messages
  end
end
