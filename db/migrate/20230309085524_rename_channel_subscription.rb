class RenameChannelSubscription < ActiveRecord::Migration[7.0]
  def change
    rename_table :channel_subscriptions, :dm_subscriptions
  end
end
