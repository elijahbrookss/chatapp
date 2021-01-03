class UserChannelsController < ApplicationController

  def create
    # Invite users to chat
    user_channel = UserChannel.new(user_channel_params)
    if user_channel.save
      render json: user_channel
    end
  end

  def destroy
    #Leave Chat
  end

  private

  def user_channel_params
    params.require(:user_channel).permit(:user_id, :channel_id)
  end

end
