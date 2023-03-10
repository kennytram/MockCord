# == Schema Information
#
# Table name: dm_subscriptions
#
#  id                :bigint           not null, primary key
#  user_id           :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  direct_message_id :bigint
#
class DmSubscription < ApplicationRecord
    validates :direct_message_id, uniqueness: { scope: :user_id }
    belongs_to :direct_message
    belongs_to :user
end
