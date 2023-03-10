class Api::ChannelsController < ApplicationController

    def index
        @server = current_user.servers.find(params[:server_id])
        render :index
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find(params[:id])
        @server = @channel.server
        if @channel.update(channel_params)
            render :show
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
        render :show
    end


    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end
end
