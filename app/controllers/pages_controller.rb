class PagesController < ApplicationController
  def get_content
    page = Page.find_by_id(params[:page_id])
    highlighters = page.project.highlighters

    render json: {
      page: page,
      highlighters: highlighters
    }
  end
end
