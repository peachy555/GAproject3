class NotesController < ApplicationController
  def create
    new_note = Note.create(content: params[:content], highlight_id: params[:highlight_id])

    render json: new_note
  end
end
