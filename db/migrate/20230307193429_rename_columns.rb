class RenameColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :messagable_type, :messageable_type
    rename_column :messages, :messagable_id, :messageable_id
  end
end
