class Api::ServersController < ApplicationController
    def create
        @server = Server.new(server_params)
        @server.owner_id ||= current_user.id
        @server.invite_token = @server.generate_unique_invite_token
        if @server.save
            @server_subscription = ServerSubscription.create!(user_id: @server.owner_id, server_id: @server.id)
            @channel = Channel.create!(name: 'general', server_id: @server.id)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def index
        @servers = Server.all
        render :index
    end 

    def show
        if current_user
            @server = current_user.servers.find(params[:id]) 
            # @invite_link = invite_link();
            @channels = @server.channels
            render :show
        end
    end

    def destroy
        @server = Server.find(params[:id])
        @server.destroy if @server.owner_id == current_user.id
    end

    def update 
        @server = Server.find(params[:id])
        if @server.update(server_params)
            render :show
        else
            render json: { errors: @server.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def invite_link
        @server = Server.find(params[:id])
        @invite_token = @server.invite_token
        url = Rails.env.production? ? "https://untitled-w1r2.onrender.com/servers/#{@server.id}/invite/#{@invite_token}" : "http://localhost:3000/servers/#{@server.id}/invite/#{@invite_token}"
        render json: { invite_link: url }
    end

    def join 
        @server = Server.find_by(id: params[:id], invite_token: params[:invite_token])
        @server_subscription = ServerSubscription.create!(user_id: current_user.id, server_id: @server.id) unless ServerSubscription.find_by(user_id: current_user.id, server_id: @server.id)
        render :show
    end

    def leave
        @server = Server.find(params[:id])
        @server_subscription = ServerSubscription.find_by(user_id: current_user.id, server_id: @server.id)
        @server_subscription.destroy
    end

    def kick
        @server = Server.find(params[:id])
        @user = User.find(params[:user_id])
        @server_subscription = ServerSubscription.find_by(user_id: @user.id, server_id: @server.id)
        @server_subscription.destroy
    end

    def server_params
        params.require(:server).permit(:name, :owner_id, :invite_token)
    end

end
