class User < ApplicationRecord

  has_secure_password
  has_many :owned_channels, foreign_key: :owner_id, class_name: "Channel"
  has_many :messages
  has_many :user_channels
  has_many :reactions, through: :messages
  has_many :channels, through: :user_channels

  validates :username, { presence: true, uniqueness: true }

end
