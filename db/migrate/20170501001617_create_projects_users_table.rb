class CreateProjectsUsersTable < ActiveRecord::Migration[5.0]
  def change
    create_table :projects_users_tables do |t|
      t.integer :project_id
      t.integer :user_id
    end
  end
end
