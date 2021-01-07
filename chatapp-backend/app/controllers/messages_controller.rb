class MessagesController < ApplicationController

  def index
    messages = Message.all
    render json: MessageSerializer.new(messages).serialize
  end

  def create
    message = Message.new(message_params)
    if message.save
      broadcast_changes(message)
    end

  end

  def update
    message = Message.find_by(id: params[:id])
    message.update(message_params)
    if message.save
      broadcast_changes(message)
    end
  end

  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
    broadcast_changes(message)
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id, :channel_id)
  end

  def broadcast_changes(message)
    channel = message.channel
    messages = channel.messages
    MessagesChannel.broadcast_to(channel, MessageSerializer.new(messages).serialize)
  end
end
