class UserSerializer

  def initialize(user_obj)
    @user = user_obj
  end

  def serialize
    options = {
      include: {
        owned_channels: {
          except: [:created_at, :updated_at],
          include: {
            users: {except: [:created_at, :udpated_at]}
          }
         },
        channels: {
          except: [:created_at, :updated_at],
          include: {
            users: {except: [:created_at, :updated_at]},
            channel_owner: {except: [:created_at, :updated_at]}
          }
        }
      },
      except: [:created_at, :updated_at]
    }
    @user.to_json(options)
  end

end
