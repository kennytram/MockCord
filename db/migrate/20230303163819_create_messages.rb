class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :text, null: false, index: true
      t.references :messagable, polymorphic: true, null: false, index: true
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
