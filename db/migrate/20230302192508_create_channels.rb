class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.references :server, null: false, foreign_key: true
      t.timestamps
    end
    add_index :channels, :name
  end
end
