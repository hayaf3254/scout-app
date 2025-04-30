Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'students/login', to: 'students#login'
      resources :messages, only: [:index, :show, :create, :update, :destroy]
      resources :companies, only: [:index, :show, :create, :update, :destroy]
      resources :students, only: [:index, :show, :create, :update, :destroy]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check


end
