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

  def create
    new_page = Page.create(title: params[:title], content: params[:content], project_id: params[:project_id])

    render json: new_page
  end

  def get_pages_min
    render json: Project.find_by_id(params[:project_id]).pages.pluck(:id, :title)
  end

  def destroy
    deleted_page = Page.find_by_id(params[:page_id]).destroy
    render json: deleted_page
  end
end
