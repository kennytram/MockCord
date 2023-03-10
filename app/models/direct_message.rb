# == Schema Information
#
# Table name: direct_messages
#
#  id            :bigint           not null, primary key
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#  other_user_id :bigint
#
class DirectMessage < ApplicationRecord
    validates :user_id, presence: true
    validates :other_user_id, presence: true

    has_many :subscriptions, foreign_key: :direct_message_id, class_name: :DmSubscription, dependent: :destroy
    has_many :users, through: :subscriptions, source: :user

    belongs_to :user, dependent: :destroy
    belongs_to :other_user, foreign_key: :other_user_id, class_name: :User, dependent: :destroy
    
    has_many :messages, as: :messageable
end
