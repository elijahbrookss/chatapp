class ChannelSerializer

  def initialize(channel_obj)
    @channel = channel_obj
  end

  def serialize
    options = {
      include: {
        channel_owner: { except: [:created_at, :updated_at] },
        messages: { except: [:updated_at], include: [:user, :reactions]  },
        users: {except: [:created_at, :updated_at]}
      },
      except: [:created_at, :updated_at]
    }
    @channel.to_json(options)
  end

end
