class Company < ApplicationRecord
    #validatesで各カラムに対するバリデーション（入力ルール）を設定
    #presence: trueは必須項目であることを示す
    #uniqueness → 他のレコードと重複不可、messageでエラー文を変更できる
    has_secure_password
    validates :user_id, presence: true, uniqueness: { message: "は既に使用されています。他のIDを使用してください。" }
    validates :name, presence: true
    validates :password, presence: true
    validates :publish, presence: true
end
