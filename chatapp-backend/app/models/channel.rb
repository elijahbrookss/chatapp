class Channel < ApplicationRecord

  belongs_to :channel_owner, foreign_key: :owner_id, class_name: "User"  
  has_many :messages 
  has_many :user_channels
  has_many :users, through: :user_channels

end
