class HighlightersController < ApplicationController
  def create
    new_highlighter = Highlighter.create(name: params[:name], color: params[:color], backgroundColor: params[:backgroundColor], project_id: params[:project_id])
    render json: new_highlighter
  end

  def get_highlighters_min
    render json: Project.find_by_id(params[:project_id]).highlighters.pluck(:id, :name)
  end

  def destroy
    deleted_highlighter = Highlighter.find_by_id(params[:highlighter_id]).destroy
    render json: deleted_highlighter
  end
end
