# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  server_id    :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  channel_type :string           default("public"), not null
#  is_voice     :boolean          default(FALSE), not null
#
class Channel < ApplicationRecord
    belongs_to :server, class_name: :Server
    has_many :messages, as: :messageable

    has_many :dm_subscriptions, foreign_key: :channel_id, class_name: :ChannelSubscription, dependent: :destroy
    has_many :dm_members, through: :dm_subscriptions, source: :user
end
