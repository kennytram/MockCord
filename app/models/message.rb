# == Schema Information
#
# Table name: messages
#
#  id              :bigint           not null, primary key
#  text            :text             not null
#  messagable_type :string           not null
#  messagable_id   :bigint           not null
#  sender_id       :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Message < ApplicationRecord
    # validates :text, presence: true
    # validates :messagable_type, :messagable_id, presence: true
    # validates :messagable_id, uniqueness: {scope: [:messagable_type]}
    # belongs_to :sender, foreign_key: :sender_id, class_name: :User

    # belongs_to :messagable, polymorphic: true
end
