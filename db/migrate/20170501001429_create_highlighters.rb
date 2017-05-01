class CreateHighlighters < ActiveRecord::Migration[5.0]
  def change
    create_table :highlighters do |t|
      t.string :name
      t.string :color
      t.string :backgroundColor
      t.integer :project_id

      t.timestamps
    end
  end
end
