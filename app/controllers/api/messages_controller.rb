class Api::MessagesController < ApplicationController
    include Rails.application.routes.url_helpers   
    def index
        @channel = Channel.find(params[:channel_id])
        @messages = @channel.messages
        render :index
    end
    
    def create
        @message = Message.new(message_params)
        @message.author_id ||= current_user.id
        if @message.messageable and @message.save
            # ChannelsChannel.broadcast_to(@message.messageable, { type: "RECEIVE_MESSAGE", message: @message })
            ChannelsChannel.broadcast_to @message.messageable,
                type: "RECEIVE_MESSAGE",
                **from_template('api/messages/show', message: @message)
            render json: nil, status: :ok
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def show
        @message = Message.find(params[:id])
        render :show 
    end

    def update
        @message = Message.find(params[:id])
        if @message.update(message_params)
            ChannelsChannel.broadcast_to @message.messageable,
                type: "UPDATE_MESSAGE",
                **from_template('api/messages/show', message: @message)
            render json: nil, status: :ok
        else
            render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @message = Message.find(params[:id]);
        @message.destroy
        ChannelsChannel.broadcast_to @message.messageable,
            type: "DELETE_MESSAGE",
            id: @message.id
        render json: nil, status: :ok
    end

    def message_params
        params.require(:message).permit(:text, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at)
    end
end
