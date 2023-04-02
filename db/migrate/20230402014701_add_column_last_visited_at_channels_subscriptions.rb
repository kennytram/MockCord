class AddColumnLastVisitedAtChannelsSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :channel_subscriptions, :last_visited_at, :datetime
  end
end
