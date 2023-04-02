class CreateAnotherChannelSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :channel_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :channel, null: false, foreign_key: true
      t.timestamps
    end
    add_index :channel_subscriptions, [:user_id, :channel_id], name: "index_channel_subscriptions_on_user_id_and_channel_id", unique: true
  end
end
