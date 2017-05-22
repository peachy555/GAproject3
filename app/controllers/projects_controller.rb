class ProjectsController < ApplicationController
  def index
    if @current_user
      @projects = @current_user.projects
    else
      redirect_to home_path
    end
  end

  def init
    render json: @current_user.projects.to_json(
      include: {
        pages: {
          include: {
            highlights: {
              notes: {}
            }
          }
        },
        highlighters: {
          include: {
            highlights: {
              notes: {}
            }
          }
        }
      }
    )
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

  def destroy
    destroyed_project = Project.find_by_id(params[:project_id]).destroy
    render json: destroyed_project
  end

  def data_change
    curr_project = Project.find_by_id(params[:project_id])

    page_count = curr_project.pages.count
    highlighter_count = curr_project.highlighters.count

    highlight_count = 0
    note_count = 0
    curr_project.highlighters.each do |highlighter|
      highlight_count = highlight_count + highlighter.highlights.count
      highlighter.highlights.each do |highlight|
        note_count = note_count + highlight.notes.length
      end
    end

    return_json = {
      keys: [],
      data: []
    }
    if page_count != params[:page_count].to_i
      return_json[:keys] << 'page'
      return_json[:data] << Page.last
    end

    if highlighter_count != params[:highlighter_count].to_i
      return_json[:keys] << 'highlighter'
      return_json[:data] << Highlighter.last
    end

    if highlight_count != params[:highlight_count].to_i
      return_json[:keys] << 'highlight'
      return_json[:data] << Highlight.last.to_json(
        include: {
          page: {},
          highlighter: {}
        }
      )
    end

    if note_count != params[:note_count].to_i
      return_json[:keys] << 'note'
      return_json[:data] << Note.last.to_json(
        include: {
          highlight: {}
        }
      )
    end

    render json: return_json
  end
end
