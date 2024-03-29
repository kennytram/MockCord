# == Schema Information
#
# Table name: server_subscriptions
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ServerSubscription < ApplicationRecord
    validates :user_id, uniqueness: { scope: :server_id }
    belongs_to :server
    belongs_to :user
end
