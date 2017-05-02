class HighlightersController < ApplicationController
  def new
    @highlighter = Highlighter.new
    @project_id = params[:project_id]

  end

  def create
    new_highlighter = Highlighter.create(name: params[:name], color: params[:color], backgroundColor: params[:backgroundColor], project_id: params[:project_id])

    render json: new_highlighter
  end
end
