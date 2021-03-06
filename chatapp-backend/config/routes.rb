Rails.application.routes.draw do
  resources :reactions, only: [:create, :destroy]
  resources :channels, only: [:index, :show, :create, :destroy, :update]
  resources :messages, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :login, only: [:create]
  resources :user_channels, only: [:create, :destroy]

  # Custom route for current user
  get '/current-user', to: "users#get_current_user"
  delete '/user_channels/leave', to: "user_channels#destroy"
  # Action Cable Socket
  mount ActionCable.server => '/cable'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
