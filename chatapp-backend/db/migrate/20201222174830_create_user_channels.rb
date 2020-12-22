class CreateUserChannels < ActiveRecord::Migration[6.0]
  def change
    create_table :user_channels do |t|
      t.integer :user_id
      t.integer :channel_id

      t.timestamps
    end
  end
end
