Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "sessions#new"

  get "get_content", to: "pages#get_content"
  get "workspace", to: "projects#index", as: "workspace"
  get "settings", to: "users#settings", as: "settings"

  resources "highlighters"
  post "highlights/new", to: "highlights#create"
  post "highlighters/new", to: "highlighters#create"
  post "projects/new", to: "projects#create"
  post "pages/new", to: "pages#create"

  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"
  post "users/new", to: "users#create", as: "signup"

  patch "projects", to: "projects#add_collab"
end
