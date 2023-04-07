class Api::ChannelsController < ApplicationController

    def index
        @dm_channels = current_user.dm_channels
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            # render :show
            render 'api/channels/show'
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find(params[:id])
        @server = @channel.server
        if @channel.update(channel_params)
            # render :show
            render 'api/channels/show'
        else
            render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @channel.destroy
    end

    def show 
        @channel = Channel.find(params[:id])
        @server = @channel.server
        # render :show
        render 'api/channels/show'
    end

    def subscribe
        @channel = Channel.find(params[:id])
        @user = User.find(params[:user_id])
        @user.subscribe_channel(@channel)
        render :show
    end

    def leave
        @channel = Channel.find(params[:id])
        @user = current_user
        @user.unsubscribe_channel(@channel)
    end

    def kick
        @channel = Channel.find(params[:id])
        @user = User.find(params[:user_id])
        @user.unsubscribe_channel(@channel)
    end


    def channel_params
        params.require(:channel).permit(:name, :server_id, :channel_type, :is_voice, :user_id, :id)
    end
end
