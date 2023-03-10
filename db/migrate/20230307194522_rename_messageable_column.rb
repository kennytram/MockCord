class RenameMessageableColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :sender_id, :author_id
  end
end
