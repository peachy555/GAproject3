Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "sessions#new"

  get "get_content", to: "pages#get_content"
  get "workspace", to: "projects#index", as: "workspace"
  get "settings", to: "users#settings", as: "settings"

  resources "highlighters"
  post "highlights/new", to: "highlights#create"
  # get "highlighters/new", to: "highlighters#new", as: "highlighter_new"

  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"
end
