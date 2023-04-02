class AddColumnParentMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :parent_message_id, :bigint
    add_index :messages, :parent_message_id
  end
end
