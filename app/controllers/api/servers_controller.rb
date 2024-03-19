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
            @channels = @server.channels
            render :show
        end
    end

    def destroy
        @server = Server.find(params[:id])
        @server.destroy if @server.owner_id == current_user.id
        ServersChannel.broadcast_to @server,
            type: "DESTROY_SERVER",
            id: @server.id
    end

    def update 
        @server = Server.find(params[:id])
        if @server.update(server_params)
            ServersChannel.broadcast_to @server,
                type: "UPDATE_SERVER",
                **from_template('api/servers/show', server: @server)
            render json: nil, status: :ok
            # render :show
        else
            render json: { errors: @server.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def invite_link
        @server = Server.find(params[:id])
        @invite_token = @server.invite_token
        url = Rails.env.production? ? "https://mockcord.onrender.com/channels/#{@server.id}/#{@invite_token}" : "http://localhost:3000/channels/#{@server.id}/#{@invite_token}"
        render json: { invite_link: url }
    end

    def join 
        @server = Server.find_by(id: params[:id], invite_token: params[:invite_token])
        # if(@server.members.find(current_user.id))
        #     render json: { errors: ['You are already a member of this server.'] }, status: :unauthorized
        #     return
        # end
        @server_subscription = ServerSubscription.create!(user_id: current_user.id, server_id: @server.id) unless ServerSubscription.find_by(user_id: current_user.id, server_id: @server.id)
        ServersChannel.broadcast_to @server,
            type: "JOIN_SERVER",
            **from_template('api/servers/show', server: @server)
        # render :show
        render json: nil, status: :ok
    end

    def leave
        @server = Server.find(params[:id])
        @server_subscription = ServerSubscription.find_by(user_id: current_user.id, server_id: @server.id)
        @server_subscription.destroy
        ServersChannel.broadcast_to @server,
            type: "LEAVE_SERVER",
            id: @server.id
    end

    def kick
        @server = Server.find(params[:id])
        @user = User.find(params[:user_id])
        @server_subscription = ServerSubscription.find_by(user_id: @user.id, server_id: @server.id)
        @server_subscription.destroy
        ServersChannel.broadcast_to @server,
            type: "KICK_SERVER",
            id: @server.id
    end

    def server_params
        params.require(:server).permit(:name, :owner_id, :invite_token)
    end

end
