class ReactionsController < ApplicationController
  def create
    reaction = Reaction.new(reaction_params)
    if reaction.save
      render json: reaction
    end
  end

  def destroy
    # Find Reaction in database and destroy
  end

  private
  def reaction_params
    params.require(:reaction).permit(:emoji, :message_id)
  end
end
