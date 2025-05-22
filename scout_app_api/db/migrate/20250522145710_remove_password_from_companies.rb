class RemovePasswordFromCompanies < ActiveRecord::Migration[8.0]
  def change
    remove_column :companies, :password, :string
  end
end
