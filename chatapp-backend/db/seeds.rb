User.destroy_all
Channel.destroy_all
UserChannel.destroy_all
Message.destroy_all

u1 = User.create(first_name: "David", last_name: "Molina", email: "example@email.com", username: "dmolina")
u2 = User.create(first_name: "Elijah", last_name: "Brooks", email: "email@example.com", username: "ebrooks")

ch1 = Channel.create(owner_id: u1.id, name: "channel1")
ch2 = Channel.create(owner_id: u2.id, name: "channel2")

# uc1 = UserChannel.create(user_id:u1.id, channel_id:ch1.id)
uc2 = UserChannel.create(user_id:u1.id, channel_id:ch2.id)
uc3 = UserChannel.create(user_id:u2.id, channel_id:ch1.id)


m1 = Message.create(content: "David message", user_id: u1.id, channel_id: ch1.id)
m2 = Message.create(content: "Elijah message", user_id: u2.id, channel_id: ch1.id)
m3 = Message.create(content: "David channel 2 message", user_id: u1.id, channel_id: ch2.id)
m4 = Message.create(content: "Elijah channel 2 message", user_id: u2.id, channel_id: ch2.id)