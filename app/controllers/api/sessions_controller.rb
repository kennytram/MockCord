class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    if @user
      login!(@user)
      @user.update!(is_online: true)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, 
        status: :unauthorized
    end
  end

  def destroy
    current_user.update!(is_online: false)
    logout!
    render json: { message: 'success' }
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :status, :tag, :is_online)
  end
end
