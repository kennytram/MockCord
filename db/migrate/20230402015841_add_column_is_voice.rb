class AddColumnIsVoice < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :is_voice, :boolean, default: false, null: false
  end
end
