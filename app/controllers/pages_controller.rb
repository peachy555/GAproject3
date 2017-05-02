class PagesController < ApplicationController
  def get_content
    page = Page.find_by_id(params[:page_id])
    highlighters = page.project.highlighters
    highlights = page.highlights

    render json: {
      page: page,
      highlights: highlights,
      highlighters: highlighters
    }
  end
end
