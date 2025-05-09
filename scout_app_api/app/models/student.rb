class Student < ApplicationRecord #Studentモデルの定義,ApplicationRecordを継承することでDB連携やバリデーション機能が使える。
    #validatesで各カラムに対するバリデーション（入力ルール）を設定
    #presence: trueは必須項目であることを示す
    #uniqueness → 他のレコードと重複不可、messageでエラー文を変更できる
    validates :user_id, presence: true, uniqueness: { message: "は既に使用されています。他のIDを使用してください。" } ## user_idは必須かつ重複不可（ログイン用IDとして使う）
    validates :name, presence: true
    validates :password, presence: true #パスワード必須
    validates :appeal_point, length: { maximum: 1000 }, allow_blank: true # 最大1000文字まで。空欄はOK（空欄なら文字数チェックはスキップされる）
end
