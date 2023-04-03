class RenameChannelColumnType < ActiveRecord::Migration[7.0]
  def change
    rename_column :channels, :type, :channel_type
  end
end
