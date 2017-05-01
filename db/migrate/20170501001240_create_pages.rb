class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.string :title
      t.string :content
      t.integer :project_id

      t.timestamps
    end
  end
end
