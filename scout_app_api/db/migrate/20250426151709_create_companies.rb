class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :user_id
      t.string :password
      t.string :name
      t.text :publish

      t.timestamps
    end
  end
end
