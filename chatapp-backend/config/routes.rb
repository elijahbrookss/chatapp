Rails.application.routes.draw do
  # resources :user_channels
  resources :channels, only: [:index, :show, :create, :destroy, :update]
  resources :messages, only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
