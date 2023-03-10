class AddOtherUserAssociation < ActiveRecord::Migration[7.0]
  def change
    remove_column :direct_messages, :other_user_id
    add_reference :direct_messages, :other_user, foreign_key: {to_table: :users}
  end
end
