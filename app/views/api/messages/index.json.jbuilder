
@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :text, :author_id, :messageable_id, :messageable_type,:created_at, :updated_at
    end
end

