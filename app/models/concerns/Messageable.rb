module Messageable extend ActiveSupport::Concern

    included do
        has_many :messages, as: :messageable
    end

    # def receive_message(message)
    #     self.messages.
    # end

end