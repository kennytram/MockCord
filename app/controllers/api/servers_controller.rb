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
            @invite_link = invite_link(@server.invite_token)
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
        if Rails.env.production?
            "https://untitled-w1r2.onrender.com/invite/#{@invite_token}"
        else
            "http://localhost:3000/invite/#{@invite_token}"
        end
    end

    def join 
        @server = Server.find(params[:invite_token])
        @server_subscription = ServerSubscription.create!(user_id: current_user.id, server_id: @server.id)
        render :show
    end

    def server_params
        params.require(:server).permit(:name, :owner_id, :invite_token)
    end

end
