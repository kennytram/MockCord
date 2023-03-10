class AddColumnUserDm < ActiveRecord::Migration[7.0]
  def change
    add_reference :direct_messages, :users
  end
end
