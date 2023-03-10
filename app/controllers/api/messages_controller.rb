class Api::MessagesController < ApplicationController
    
    def index
        @channel = Channel.find(params[:channel_id])
        @messages = @channel.messages
        render :index
    end
    
    def create
        @message = Message.new(message_params)
        @message.author_id ||= current_user.id
        
        if @message.save
            render :show
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
            render :show
        else
            render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @message = Message.find(params[:id]);
        @message.destroy;
    end

    def message_params
        params.require(:message).permit(:text, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at)
    end
end
