class SessionsController < ApplicationController
  def new
    if @current_user
      redirect_to workspace_path
    end
  end

  def create
    if !(params[:email] =~ /.+@.+\..+/i).nil? # Check if this is in an email format
      user = User.find_by(email: params[:email])
      if user
        if user.authenticate(params[:password])
          session[:user_id] = user.id
          redirect_to workspace_path
        else
          redirect_to home_path
        end
      else
        redirect_to home_path
      end
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
