class AddColumnTokenLinkServer < ActiveRecord::Migration[7.0]
  def change
    add_column :servers, :token_link, :string
    change_column_null :messages, :messageable_type, false
    change_column_null :messages, :messageable_id, false
    change_column_null :users, :status, false
    change_column_null :users, :tag, false
  end
end
