Rails.application.routes.draw do
  # resources :user_channels
  resources :channels, only: [:index, :show, :create, :destroy, :update]
  resources :messages, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :login, only: [:create]

  # Custom route for current user
  get '/current-user', to: "users#get_current_user"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
