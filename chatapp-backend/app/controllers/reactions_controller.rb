class ReactionsController < ApplicationController
  def create
    reaction = Reaction.new(reaction_params)
    message = reaction.message
    if reaction.save
      broadcast_changes(message)
    end
  end

  def destroy
    reaction = Reaction.find(params[:id])
    message = reaction.message
    reaction.destroy()
    broadcast_changes(message);
  end

  private

  def reaction_params
    params.require(:reaction).permit(:emoji, :message_id, :user_id)
  end

  def broadcast_changes(message)
    channel = message.channel
    messages = channel.messages
    MessagesChannel.broadcast_to(channel, MessageSerializer.new(messages).serialize)
  end
end
