class CreateReactions < ActiveRecord::Migration[6.0]
  def change
    create_table :reactions do |t|
      t.references :message
      t.string :emoji
      t.timestamps
    end
  end
end
