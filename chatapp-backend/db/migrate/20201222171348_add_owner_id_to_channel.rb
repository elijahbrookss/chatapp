class AddOwnerIdToChannel < ActiveRecord::Migration[6.0]
  def change
    add_column :channels, :owner_id, :integer
  end
end
