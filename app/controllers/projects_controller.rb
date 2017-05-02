class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects
    @highlighters = []
    @pages = []
  end
end
