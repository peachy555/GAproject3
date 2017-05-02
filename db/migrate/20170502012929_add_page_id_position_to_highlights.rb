class AddPageIdPositionToHighlights < ActiveRecord::Migration[5.0]
  def change
    add_column :highlights, :page_id, :integer
  end
end
