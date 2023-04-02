# == Schema Information
#
# Table name: channel_subscriptions
#
#  id              :bigint           not null, primary key
#  user_id         :bigint           not null
#  channel_id      :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  last_visited_at :datetime
#
class ChannelSubscription < ApplicationRecord
    validates :channel_id, uniqueness: { scope: :user_id }
    belongs_to :channel
    belongs_to :user
    
end
