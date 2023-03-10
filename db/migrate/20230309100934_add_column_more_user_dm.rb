class AddColumnMoreUserDm < ActiveRecord::Migration[7.0]
  def change
    add_reference :direct_messages, :other_user
  end
end
