class ChannelsController < ApplicationController

  def index
    channels = Channel.all
    render json: ChannelSerializer.new(channels).serialize
  end

  def show
    channel = Channel.find_by(id: params[:id])
    render json: ChannelSerializer.new(channel).serialize
  end

  def create
    channel = Channel.new(channel_params)
    if channel.save
      render json: ChannelSerializer.new(channel).serialize
    end
  end

  def update
    channel = Channel.find_by(id: params[:id])
    channel.update(channel_params)
    if channel.save
      render json: ChannelSerializer.new(channel).serialize
    end
  end

  def destroy
    channel = Channel.find_by(id: params[:id])
    channel.destroy
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :users)
  end

end
