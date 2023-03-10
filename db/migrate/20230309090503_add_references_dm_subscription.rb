class AddReferencesDmSubscription < ActiveRecord::Migration[7.0]
  def change
    remove_column :dm_subscriptions, :channel_id
    add_reference :dm_subscriptions, :direct_messages
  end
end
