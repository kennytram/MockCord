class AddPhotoUrlToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :photo_id, :string, default: nil
    add_column :users, :photo_url, :string, default: nil
  end
end
