Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "static_pages#root"
  
  # post 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show, :destroy, :update]
    resource :session, only: [:show, :create, :destroy]

    resources :servers, only: [:create, :destroy, :update, :show, :index]

    resources :channels, only:[ :show, :create, :destroy, :update, :index]
    # resources :direct_messages, only: [:index, :show, :create, :destroy, :update]
    resources :messages, only: [ :create, :update, :destroy]
    
    resources :friend_requests, only: [:create, :destroy, :update, :show, :index]
    
    get "/servers/:id/invite", to: "servers#invite_link", as: :invite_link_server
    post "/servers/:id/invite/:invite_token", to: "servers#join", as: :join_server
    post "/friend_requests/search", to: "friend_requests#search_create", as: :search_create_friend_request
    delete "/servers/:id/leave", to: "servers#leave", as: :leave_server
    delete "/servers/:id/leave/:user_id", to: "servers#kick", as: :kick_server
    post "/channels/:id/subscribe/:user_id", to: "channels#subscribe", as: :subscribe_channel
    delete "/channels/:id/subscribe", to: "channels#leave", as: :leave_channel
    delete "/channels/:id/subscribe/:user_id", to: "channels#kick", as: :kick_channel
    post "/users/join_call", to: "users#join_call", as: :join_call
  end
  
  get '*path', to: "static_pages#frontend_index"
end