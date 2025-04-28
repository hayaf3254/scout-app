class CreateStudents < ActiveRecord::Migration[8.0]
  def change
    create_table :students do |t|
      t.string :user_id
      t.string :password
      t.string :name

      t.timestamps
    end
  end
end
