class Api::ServersController < ApplicationController
    def create
        @server = Server.new(server_params)
        if @server.save
            @member = @Member.create(user_id: @server.owner_id, server_id: @server.id)
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def index
        @servers = current_user.servers
        render :index
        # if params[:user_id]
        #     user = User.find(params[:user_id])
        #     @servers = user.servers
        # else
        #     @servers = Server.all
        # end
    end 

    def show
        @server = current_user.servers.find(params[:id])
        # debugger
        render :show
    end

    def destroy
        @server.destroy
    end

    def update 
        @server = Server.find(params[:id])
        if @server.update(server_params)
            render json: @server
        else
            render json: { errors: @server.errors.full_messages }, status: :unprocessable_entity
        end
    end


    def server_params
        params.require(:server).permit(:name, :owner_id)
    end

end
