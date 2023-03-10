Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # post 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :servers, only: [:create, :destroy, :update, :show, :index]

    resources :channels, only:[ :show, :create, :destroy, :update, :index]
    resources :direct_messages, only: [:index, :show, :create, :destroy, :update]
    resources :messages, only: [ :create, :update, :destroy]
    resources :members, only: [:create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end