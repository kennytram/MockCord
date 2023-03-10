class AddMessageable < ActiveRecord::Migration[7.0]
  def change
    add_belongs_to(:messages, :messageable, polymorphic: true, index: true)
  end
end
