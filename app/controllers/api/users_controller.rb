class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    @user.status = "online"
    @user.tag = @user.generate_unique_username_tag
    if @user.save
      @server_subscription = ServerSubscription.create!(user_id: @user.id, server_id: 1)
      @user.update!(is_online: true)
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :status, :tag, :is_online)
  end
end
