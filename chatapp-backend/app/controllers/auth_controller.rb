class AuthController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    user = User.find_by(id: login_creds[:username])
    if user && user.authenticate(login_creds[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: UserSerializer.new(user).serialize, jwt: token }, status: :accepted
    else
      render json: { message: "Incorrect username or password" }, status: :unauthorized
    end
  end

  private
  def login_creds
    params.require(:user).permit(:username, :password)
  end

end
