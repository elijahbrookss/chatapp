class MessageSerializer 

  def initialize(message_obj) 
    @message = message_obj
  end

  def serialize
    options = {
      include: {
        user: { except: [:created_at, :updated_at] },
        channel: { except: [:created_at, :updated_at] }
      },
      except: :updated_at
    }
    @message.to_json(options)
  end

end
