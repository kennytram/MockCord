# == Schema Information
#
# Table name: friend_requests
#
#  id          :bigint           not null, primary key
#  sender_id   :bigint           not null
#  receiver_id :bigint           not null
#  status      :string           default("pending"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class FriendRequest < ApplicationRecord
    validates :sender_id, uniqueness: { scope: :receiver_id, message: "has already sent a friend request to this user" }
    validates :sender, exclusion: { in: ->(friend_request) { [friend_request.receiver] }, message: "cannot send a friend request to yourself" }
    validates :status, inclusion: { in: %w(pending accepted), message: "must be 'pending' or 'accepted'" }
    validates :receiver_id, uniqueness: { scope: :sender_id }
    
    belongs_to :sender, foreign_key: :sender_id, class_name: :User
    belongs_to :receiver, foreign_key: :receiver_id, class_name: :User

    def dm_channel
        channel_subscriptions = ChannelSubscription.where(user_id: [self.sender_id, self.receiver_id])
        channel = channel_subscriptions.map(&:channel).find { |channel| channel.dm_members.count == 2 }
        return channel[0] if channel
    end
end
