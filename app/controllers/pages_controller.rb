class PagesController < ApplicationController
  def get_content
    page = Page.find_by_id(params[:page_id])
    highlighters = page.project.highlighters
    project = Project.find_by_id(Page.find_by_id(params[:page_id]).project.id)

    render json: project.to_json(
      include: {
        pages: {
          include: {
            highlights: {
              include: {
                notes: {}
              }
            }
          }
        },
        highlighters: {
          include: {
            highlights: {
              include: {
                notes: {}
              }
            }
          }
        }
      }
    )
    # render json: {
    #   page: page.to_json(
    #     include: {
    #       highlights: {
    #         include: {
    #           notes: {}
    #         }
    #       }
    #     }
    #   ),
    #   highlighters: highlighters.to_json(
    #     include: {
    #       highlights: {
    #         include: {
    #           notes: {}
    #         }
    #       }
    #     }
    #   )
    # }
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
