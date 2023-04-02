class AddNullAndIndexUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :status, true
    change_column_null :users, :tag, true
    add_index :users, [:username, :tag], unique: true
  end
end
