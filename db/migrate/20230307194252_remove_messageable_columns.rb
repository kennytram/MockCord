class RemoveMessageableColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :messageable_id
    remove_column :messages, :messageable_type
  end
end
