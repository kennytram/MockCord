class AddNullMessages < ActiveRecord::Migration[7.0]
  def change
    change_column_null :messages, :messageable_type, true
    change_column_null :messages, :messageable_id, true
  end
end
