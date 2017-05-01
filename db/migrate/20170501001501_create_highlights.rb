class CreateHighlights < ActiveRecord::Migration[5.0]
  def change
    create_table :highlights do |t|
      t.string :content
      t.integer :highlighter_id

      t.timestamps
    end
  end
end
