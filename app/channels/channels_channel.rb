class ChannelsChannel < ApplicationCable::Channel
    def subscribed
        @channel = Channel.find(params[:id])
        if @channel
            stream_for @channel
        else
            transmit(type: "CHANNEL_NOT_FOUND")
        end
    end

end