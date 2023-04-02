# == Schema Information
#
# Table name: messages
#
#  id                :bigint           not null, primary key
#  text              :text             not null
#  author_id         :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  messageable_type  :string
#  messageable_id    :bigint
#  parent_message_id :bigint
#
class Message < ApplicationRecord
    validates :text, presence: true
    validates :author_id, presence: true
    validates :messageable_type, presence: true
    validates :messageable_id, presence: true

    belongs_to :author, foreign_key: :author_id, class_name: :User

    belongs_to :messageable, polymorphic: true

    belongs_to :parent_message, foreign_key: :parent_message_id, class_name: :Message, optional: true
end
