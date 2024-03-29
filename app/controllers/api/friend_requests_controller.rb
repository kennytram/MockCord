class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = current_user ? current_user.friend_requests : []
        @current_user = current_user
        render :index if current_user
    end

    def create
        @friend_request = FriendRequest.new(friend_request_params)
        @friend_request.sender_id ||= current_user.id
        if @friend_request.save
            @dm_channel = @friend_request.dm_channel
            @sender = User.find(@friend_request.sender_id);
            @receiver = User.find(@friend_request.receiver_id);
            # debugger
            FriendRequestsChannel.broadcast_to @sender,
                type: "RECEIVE_FRIEND_REQUEST",
                **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @sender, dm_channel: @dm_channel)
            FriendRequestsChannel.broadcast_to @receiver,
                type: "RECEIVE_FRIEND_REQUEST",
                **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @receiver, dm_channel: @dm_channel)
            # render :show
            render json: nil, status: :ok
        else
            render json: @friend_request.errors.full_messages, status: 422
        end
    end

    def search_create
        friend = User.find_by(username: params[:user][:username], tag: params[:user][:tag])
        if friend
            @friend_request = FriendRequest.new(receiver_id: friend.id)
            @friend_request.sender_id ||= current_user.id
            if @friend_request.save
                @dm_channel = @friend_request.dm_channel
                @sender = User.find(@friend_request.sender_id);
                @receiver = User.find(@friend_request.receiver_id);
                FriendRequestsChannel.broadcast_to @sender,
                    type: "RECEIVE_FRIEND_REQUEST",
                    **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @sender, dm_channel: @dm_channel)
                FriendRequestsChannel.broadcast_to @receiver,
                    type: "RECEIVE_FRIEND_REQUEST",
                    **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @receiver, dm_channel: @dm_channel)
                # render 'api/friend_requests/show'
                render json: nil, status: :ok
            else
                if friend === current_user
                    render json: ["Aren't you already friends with yourself?"], status: 422
                else 
                    render json: ["There's already an existing friend request with this user."], status: 422
                end
            end
        else
            # render json: ["User not found"], status: 404
            # render json: { errors: ["User not found"] }, status: :unprocessable_entity
            # render json: { errors: ["User not found"] }, status: 404
            render json: ["Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct."], status: 404
        end
    end

    def update
        @friend_request = FriendRequest.find(params[:id])
        if @friend_request.update(friend_request_params)
            @sender = User.find(@friend_request.sender_id)
            @receiver = User.find(@friend_request.receiver_id)
            if @friend_request.status == "accepted"
                @dm_channel = Channel.create(name: "#{@sender.username}/#{@receiver.username}", channel_type: "private")
                ChannelSubscription.create(user_id: @friend_request.sender_id, channel_id: @dm_channel.id)
                ChannelSubscription.create(user_id: @friend_request.receiver_id, channel_id: @dm_channel.id)
            end
            FriendRequestsChannel.broadcast_to @sender,
                type: "UPDATE_FRIEND_REQUEST",
                **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @sender, dm_channel: @dm_channel)
            FriendRequestsChannel.broadcast_to @receiver,
                type: "UPDATE_FRIEND_REQUEST",
                **from_template('api/friend_requests/show', friend_request: @friend_request, current_user: @receiver, dm_channel: @dm_channel)
            # render :show
            render json: nil, status: :ok
        else
            render json: { errors: @friend_request.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friend_request = FriendRequest.find(params[:id])
        @dm_channel = @friend_request.dm_channel
        @dm_channel.destroy if @dm_channel
        @friend_request.destroy
        @sender = User.find(@friend_request.sender_id);
        @receiver = User.find(@friend_request.receiver_id);
        FriendRequestsChannel.broadcast_to @sender,
            type: "DESTROY_FRIEND_REQUEST",
            id: @receiver.id
        FriendRequestsChannel.broadcast_to @receiver,
            type: "DESTROY_FRIEND_REQUEST",
            id: @sender.id
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
