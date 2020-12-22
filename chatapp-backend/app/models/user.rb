class User < ApplicationRecord

  has_many :owned_channels, foreign_key: :owner_id, class_name: "Channel"
  has_many :messages 
  has_many :user_channels
  has_many :channels, through: :user_channels

end
