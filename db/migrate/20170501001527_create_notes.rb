class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.string :content
      t.integer :highlight_id

      t.timestamps
    end
  end
end
