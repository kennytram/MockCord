class RemoveColumnDm < ActiveRecord::Migration[7.0]
  def change
    remove_column :direct_messages, :users_id
    add_reference :direct_messages, :user
  end
end
