class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    @highlighters = []
    @pages = []
  end

  def create
    new_project = Project.create(name: params[:name])
    new_project.users << current_user
    
    render json: new_project
  end
end
