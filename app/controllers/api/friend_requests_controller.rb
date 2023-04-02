class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = current_user.friend_requests
        render :index
    end

    def create
        @friend_request = FriendRequest.new(friend_request_params)
        @friend_request.sender_id ||= current_user.id
        if @friend_request.save
            render :show
        else
            render json: @friend_request.errors.full_messages, status: 422
        end
    end

    def update
        @friend_request = FriendRequest.find(params[:id])
        if @friend_request.update(friend_request_params)
            if @friend_request.status == "accepted"
                @sender = User.find(@friend_request.sender_id)
                @receiver = User.find(@friend_request.receiver_id)
                @dm_channel = Channel.create(name: `#{sender.username}/#{receiver.username}`, type: "private")
                ChannelSubscription.create(user_id: @friend_request.sender_id, channel_id: @dm_channel.id)
                ChannelSubscription.create(user_id: @friend_request.receiver_id, channel_id: @dm_channel.id)
            end
            render :show
        else
            render json: { errors: @friend_request.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friend_request = FriendRequest.find(params[:id])
        @friend_request.destroy
    end

    def show
        @friend_request = FriendRequest.find(params[:id])
        render :show
    end

    private

    def friend_request_params
        params.require(:friend_request).permit(:receiver_id, :status)
    end
end
