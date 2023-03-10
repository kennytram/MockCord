class ChangeMemberName < ActiveRecord::Migration[7.0]
  def change
    rename_table :members, :server_subscriptions
  end
end
