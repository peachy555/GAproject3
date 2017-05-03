class ProjectsController < ApplicationController
  def index
    @projects = @current_user.projects
    @highlighters = []
    @pages = []
  end

  def create
    new_project = Project.create(name: params[:name])
    new_project.users << @current_user

    render json: new_project
  end

  def add_collab
    new_collab = User.find_by_email(params[:email])
    project = Project.find_by_id(params[:project_id])

    if !(project.nil? || new_collab.nil?)
      project.users << new_collab
    end
    
    render json: project
  end
end
