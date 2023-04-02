class RenameColumnInviteToken < ActiveRecord::Migration[7.0]
  def change
    rename_column :servers, :token_link, :invite_token
  end
end
