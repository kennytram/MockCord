# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
    validates :name, presence: true
    validates :owner_id, presence: true

    belongs_to :owner, foreign_key: :owner_id, class_name: :User
    
    has_many :subscriptions, foreign_key: :server_id, class_name: :ServerSubscription, dependent: :destroy
    has_many :members, through: :subscriptions, source: :user

    has_many :channels, dependent: :destroy
    
end
