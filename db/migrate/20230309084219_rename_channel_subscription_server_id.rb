class RenameChannelSubscriptionServerId < ActiveRecord::Migration[7.0]
  def change
    rename_column :channel_subscriptions, :server_id, :channel_id
  end
end
