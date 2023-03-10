class Api::DirectMessagesController < ApplicationController
    def index
        @dms = current_user.dms
        @users = User.all
        render :index
    end

    def create
        @dm = DirectMessage.new(dm_params)
        if @dm.save
            @current_user = current_user
            other_user_id = @dm.other_user_id
            @other_user = User.find(other_user_id)
            @dm_subscription_current_user = DmSubscription.create!(user_id: current_user.id, direct_message_id: @dm.id)
            @dm_subscription_other_user = DmSubscription.create!(user_id: other_user_id, direct_message_id: @dm.id)
            render :show
        else
            render json: @dm.errors.full_messages, status: 422
        end
    end

    def update
        @dm = DirectMessage.find(params[:id])
        if @dm.update(dm_params)
            render :show
        else
            render json: { errors: @dm.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @dm = DirectMessage.find(params[:id])
        @dm.destroy
    end

    def show 
        
        @dm = DirectMessage.find(params[:id])
        @current_user = current_user
        @other_user = User.find_by_id(@dm.other_user_id)
        
        render :show
    end


    def dm_params
        params.require(:direct_message).permit(:name, :user_id, :other_user_id)
    end
end
