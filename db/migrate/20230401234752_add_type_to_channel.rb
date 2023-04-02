class AddTypeToChannel < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :type, :string, null: false, default: 'public'
  end
end
