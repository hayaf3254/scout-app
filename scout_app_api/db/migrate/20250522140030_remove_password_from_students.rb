class RemovePasswordFromStudents < ActiveRecord::Migration[8.0]
  def change
    remove_column :students, :password, :string
  end
end
