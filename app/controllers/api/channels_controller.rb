class Api::ChannelsController < ApplicationController

    def index
        @dm_channels = current_user.dm_channels
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            # render :show
            # ServersChannel.broadcast_to(@channel.server, { type: "CREATE_CHANNEL", channel: @channel })
            # render 'api/channels/show'
            ServersChannel.broadcast_to @channel.server,
                type: "RECEIVE_CHANNEL",
                **from_template('api/channels/show', channel: @channel)
            render json: nil, status: :ok
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find(params[:id])
        
        @server = @channel.server
        if @channel.update(channel_params)
            # render :show
            # render 'api/channels/show'
            ServersChannel.broadcast_to @channel.server,
                type: "UPDATE_CHANNEL",
                **from_template('api/channels/show', channel: @channel)
            render json: nil, status: :ok
        else
            render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @server = @channel.server
        @channel.destroy
        ServersChannel.broadcast_to @server,
            type: "DESTROY_CHANNEL",
            id: @channel.id
    end

    def show 
        @channel = Channel.find(params[:id])
        @server = @channel.server
        # debugger
        render :show
    end

    def subscribe
        @channel = Channel.find(params[:id])
        @user = User.find(params[:user_id])
        @user.subscribe_channel(@channel)
        render :show
        # ServersChannel.broadcast_to @channel.server,
        #     type: "JOIN_SERVER",
        #     **from_template('api/channels/show', channel: @channel)
        # render json: nil, status: :ok
    end

    def leave
        @channel = Channel.find(params[:id])
        @user = current_user
        @user.unsubscribe_channel(@channel)
        # ServersChannel.broadcast_to @channel.server,
        #     type: "LEAVE_SERVER",
        #     id: @channel.id
        # render json: nil, status: :ok
    end

    def kick
        @channel = Channel.find(params[:id])
        @user = User.find(params[:user_id])
        @user.unsubscribe_channel(@channel)
        # ServersChannel.broadcast_to @channel.server,
        #     type: "LEAVE_SERVER",
        #     id: @channel.id
        # render json: nil, status: :ok
    end


    def channel_params
        params.require(:channel).permit(:name, :server_id, :channel_type, :is_voice, :user_id, :id)
    end
end
