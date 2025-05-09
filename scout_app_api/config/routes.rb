Rails.application.routes.draw do #ルーティングを設定するファイル→この中にすべてのルーティング（URLとコントローラーの対応）を書く
  namespace :api do
    namespace :v1 do #URLが `/api/v1/...` になるようにしてる。
      post 'students/login', to: 'students#login' #POSTで /students/login にアクセスされたら、students_controller.rb の login メソッドを実行
      post 'companies/login', to: 'companies#login' #POSTで /companies/login にアクセスされたら、companies_controller.rb の login メソッドを実行
      resources :messages, only: [:index, :show, :create, :update, :destroy] #CRUD（作成・取得・更新・削除）APIをまとめて定義。 
      resources :companies, only: [:index, :show, :create, :update, :destroy]
      resources :students, only: [:index, :show, :create, :update, :destroy]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check ## ヘルスチェック用のルート（Railsが動作しているか確認するためのエンドポイント）


end
