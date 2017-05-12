class HighlightsController < ApplicationController
  def create
    new_highlight = Highlight.create(content: params[:content], page_id: params[:page_id], highlighter_id: params[:highlighter_id])
    # binding.pry
    render json: new_highlight
  end

end
