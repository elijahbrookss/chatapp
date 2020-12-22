class UserSerializer

  def initialize(user_obj)
    @user = user_obj
  end

  def serialize 
    options = {
      include: {
        owned_channels: { except: [:created_at, :updated_at] },
        channels: { except: [:created_at, :updated_at] }
      },
      except: [:created_at, :updated_at]
    }
    @user.to_json(options)
  end

end