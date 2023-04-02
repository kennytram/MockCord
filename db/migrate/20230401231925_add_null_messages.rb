class AddNullMessages < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :status, true
    change_column_null :users, :tag, true
  end
end
