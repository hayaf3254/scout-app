class AddAppealPointToStudents < ActiveRecord::Migration[8.0]
  def change
    add_column :students, :appeal_point, :text
  end
end
