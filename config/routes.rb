Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "sessions#new"

  get "get_content", to: "pages#get_content"
  get "workspace", to: "projects#index", as: "workspace"
  get "settings", to: "users#settings", as: "settings"

  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"
end
