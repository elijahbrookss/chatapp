class AddChannelAndUserIdToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :user_id, :integer
    add_column :messages, :channel_id, :integer
  end
end
