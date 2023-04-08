class ServersChannel < ApplicationCable::Channel
    def subscribed
        @server = Server.find(params[:id])
        stream_for @server
    end
    
    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end
end