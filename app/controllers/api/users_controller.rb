class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    @user.status = "online"
    @user.tag = @user.generate_unique_username_tag
    if @user.save
      server_subscription = ServerSubscription.create!(user_id: @user.id, server_id: 1)
      friend_request_kenny = FriendRequest.create!(sender_id: 1, receiver_id: @user.id, status: 'accepted');
      friend_request_demolition = FriendRequest.create!(sender_id: 2, receiver_id: @user.id, status: 'accepted');
      friend_request_demonstration = FriendRequest.create!(sender_id: 3, receiver_id: @user.id, status: 'accepted');
      dm_channel_kenny = Channel.create!(name: "Kenny/#{@user.username}", channel_type: "private")
      ChannelSubscription.create!(user_id: 1, channel_id: dm_channel_kenny.id)
      ChannelSubscription.create!(user_id: @user.id, channel_id: dm_channel_kenny.id)
      dm_channel_demolition = Channel.create!(name: "Demo-lition/#{@user.username}", channel_type: "private")
      ChannelSubscription.create!(user_id: 2, channel_id: dm_channel_demolition.id)
      ChannelSubscription.create!(user_id: @user.id, channel_id: dm_channel_demolition.id)
      dm_channel_demonstration = Channel.create!(name: "Demo-nstration/#{@user.username}", channel_type: "private")
      ChannelSubscription.create!(user_id: 3, channel_id: dm_channel_demonstration.id)
      ChannelSubscription.create!(user_id: @user.id, channel_id: dm_channel_demonstration.id)
      @user.update!(is_online: true)
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :status, :tag, :is_online)
  end
end
