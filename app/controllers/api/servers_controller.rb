class Api::ServersController < ApplicationController
    def create
        @server = Server.new(server_params)
        @server.owner_id ||= current_user.id
        if @server.save
            @server_subscription = ServerSubscription.create!(user_id: @server.owner_id, server_id: @server.id)
            @channel = Channel.create!(name: 'general', server_id: @server.id)

            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def index
        @servers = current_user.servers
        render :index
    end 

    def show
        if current_user
            @server = current_user.servers.find(params[:id]) 
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


    def server_params
        params.require(:server).permit(:name, :owner_id)
    end

end
