class MessagesController < ApplicationController

  def index
    messages = Message.all
    render json: MessageSerializer.new(messages).serialize
  end

  def create
    message = Message.new(message_params)
    if message.save
      render json: MessageSerializer.new(message).serialize
    end
  end

  def update
    message = Message.find_by(id: params[:id])
    message.update(message_params)
    if message.save
      render json: MessageSerializer.new(message).serialize
    end
  end

  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id, :channel_id)
  end

end
