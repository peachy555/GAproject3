class UsersController < ApplicationController
  def settings
    @projects = @current_user.projects
  end

  def create
    new_user = User.create(name: params[:name], email: params[:email], password: params[:password])

    session[:user_id] = new_user.id
    redirect_to "http://www.rubyonrails.org"
    # redirect_to workspace_path
  end
end
