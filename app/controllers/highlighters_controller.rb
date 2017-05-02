class HighlightersController < ApplicationController
  def new
    @highlighter = Highlighter.new
    @project_id = params[:project_id]

  end

  def create
    binding.pry
  end
end
