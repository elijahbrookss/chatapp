class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :index]

  def index 
    users = User.all
    render json: UserSerializer.new(users).serialize
  end

  def show
    user = User.find_by(id: params[:id])
    render json: UserSerializer.new(user).serialize 
  end

  def create
    user = User.new(user_params)
    byebug
    if user.save
      token = encode_token(user_id: user.id)
      render json: { jwt: token }, status: :created
    else 
      render json: { error: "Failed to create account" }, status: :not_acceptable
    end
  end

  def update 
    user = User.find_by(id: params[:id])
    user.update(user_params)
    if user.save 
      render json: UserSerializer.new(user).serialize 
    end
  end

  def destroy 
    user = User.find_by(id: params[:id])
    user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :password, :email)
  end
  
end
