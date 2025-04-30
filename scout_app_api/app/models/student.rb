class Student < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { message: "は既に使用されています。他のIDを使用してください。" }
    validates :name, presence: true
    validates :password, presence: true
end
