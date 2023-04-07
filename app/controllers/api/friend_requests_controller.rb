class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = current_user ? current_user.friend_requests : []
        @current_user = current_user
        render :index if current_user
    end

    def create
        @current_user = current_user
        @friend_request = FriendRequest.new(friend_request_params)
        @friend_request.sender_id ||= current_user.id
        if @friend_request.save
            @dm_channel = @friend_request.dm_channel
            render :show
        else
            render json: @friend_request.errors.full_messages, status: 422
        end
    end

    def search_create
        friend = User.find_by(username: params[:user][:username], tag: params[:user][:tag])
        if friend
            @current_user = current_user
            @friend_request = FriendRequest.new(receiver_id: friend.id)
            @friend_request.sender_id ||= current_user.id
            if @friend_request.save
                @dm_channel = @friend_request.dm_channel
                render 'api/friend_requests/show'
            else
                render json: ["There's already an existing friend request with this user."], status: 422
            end
        else
            # render json: ["User not found"], status: 404
            # render json: { errors: ["User not found"] }, status: :unprocessable_entity
            # render json: { errors: ["User not found"] }, status: 404
            render json: ["Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct."], status: 404
        end
    end

    def update
        @current_user = current_user
        @friend_request = FriendRequest.find(params[:id])
        if @friend_request.update(friend_request_params)
            if @friend_request.status == "accepted"
                @sender = User.find(@friend_request.sender_id)
                @receiver = User.find(@friend_request.receiver_id)
                @dm_channel = Channel.create(name: "#{@sender.username}/#{@receiver.username}", channel_type: "private")
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
        @dm_channel = @friend_request.dm_channel
        @dm_channel.destroy if @dm_channel
        @friend_request.destroy
    end

    def show
        @current_user = current_user
        @friend_request = FriendRequest.find(params[:id])
        @dm_channel = @friend_request.dm_channel
        render :show
    end

    private

    def friend_request_params
        params.require(:friend_request).permit(:sender_id, :receiver_id, :status)
    end

    def user_params
        params.require(:user).permit(:username, :tag, :email, :password, :status)
    end
end
