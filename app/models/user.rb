# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  status          :string           not null
#  tag             :string           not null
#  is_online       :boolean          default(FALSE), not null
#  photo_id        :string
#  photo_url       :string
#
class User < ApplicationRecord
  has_secure_password

  validates :username, 
    length: { in: 3..30 },
    presence: { message: "can't be blank" },
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    presence: { message: "can't be blank" },
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "is not valid" }

  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :username, uniqueness: { scope: :tag }
  validates :status, inclusion: { in: ["online", "idle", "do not disturb", "invisible"] }
  validates :tag, length: { is: 4 }
  validates :photo_url, format: URI::regexp(%w[http https]), allow_nil: true
  
  before_validation :ensure_session_token

  #don't need owned_servers bc owners can pass ownership

  has_many :subscribed_servers, foreign_key: :user_id, class_name: :ServerSubscription, dependent: :destroy
  has_many :servers, through: :subscribed_servers, source: :server, dependent: :destroy

  has_many :messages, foreign_key: :author_id, class_name: :Message, dependent: :destroy

  has_many :sent_friend_requests, foreign_key: :sender_id, class_name: :FriendRequest, dependent: :destroy
  has_many :received_friend_requests, foreign_key: :receiver_id, class_name: :FriendRequest, dependent: :destroy

  has_many :subscribed_dm_channels, foreign_key: :user_id, class_name: :ChannelSubscription, dependent: :destroy
  has_many :dm_channels, through: :subscribed_dm_channels, source: :channel, dependent: :destroy
  

  def friends
    sender_friend_arr = self.sent_friend_requests.where(sender_id: self.id, status: "accepted").map { |request| request.receiver }
    receiver_friend_arr = self.received_friend_requests.where(receiver_id: self.id, status: "accepted").map { |request| request.sender }
    friends_arr = sender_friend_arr + receiver_friend_arr
    # friendships = {}
    # friends_arr.each do |friend|
    #   friendships[friend.id] = {
    #     id: friend.id,
    #     username: friend.username,
    #     tag: friend.tag,
    #     status: friend.status
    #   }
    # end
    # friendships
  end

  def friend_requests
    sender_friend_request_arr = self.sent_friend_requests.where(sender_id: self.id)
    receiver_friend_request_arr = self.received_friend_requests.where(receiver_id: self.id)

    friend_requests = {}
    
    sender_friend_request_arr.each do |friend_request|
      friend_requests[friend_request.receiver_id] = {
        id: friend_request.id,
        sender_id: self.id,
        receiver_id: friend_request.receiver_id,
        status: friend_request.status,
        created_at: friend_request.created_at,
        updated_at: friend_request.updated_at
      }
    end
    
    receiver_friend_request_arr.each do |friend_request|
      friend_requests[friend_request.sender_id] = {
        id: friend_request.id,
        sender_id: friend_request.sender_id,
        receiver_id: self.id,
        status: friend_request.status,
        created_at: friend_request.created_at,
        updated_at: friend_request.updated_at
      }
    end
    
    # friend_requests
    friend_requests.values.map { |request_data| FriendRequest.new(request_data) }
  end

  def subscribe_channel(channel)
    ChannelSubscription.create(user_id: self.id, channel_id: channel.id)
  end

  def unsubscribe_channel(channel)
    ChannelSubscription.find_by(user_id: self.id, channel_id: channel.id).destroy
  end
  
  def self.find_by_credentials(credential, password)
    # field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    field = :email
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end
  
  def generate_unique_username_tag
    loop do
      tag = rand(10000).to_s.rjust(4, '0')
      break tag unless User.exists?(username: username, tag: tag)
    end
  end
  
  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end


  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
