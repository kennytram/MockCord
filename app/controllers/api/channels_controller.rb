class Api::ChannelsController < ApplicationController

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
        if @channel.update(channel_params)
            render :show
        else
            render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @channel.destroy
    end


    def channel_params
        params.require(:channel).permit(:id, :server_id)
    end
end
