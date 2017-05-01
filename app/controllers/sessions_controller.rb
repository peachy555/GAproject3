class SessionsController < ApplicationController
  def new

  end

  def create
    if params[:email].match /.+@.+\..+/i # Check if this is in an email format
      user = User.find_by(email: params[:email])
    end

    if user
      if user.authenticate(params[:password])
        # we have a real user
        # raise params
        session[:user_id] = user.id
        redirect_to workspace_path
      else
        render :new
      end
    else
      render :new
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
