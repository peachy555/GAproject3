Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "sessions#new"

  # Link to pages
  get "get_content", to: "pages#get_content"
  get "workspace", to: "projects#index", as: "workspace"
  get "settings", to: "users#settings", as: "settings"

  # Create controllers
  post "highlights/new", to: "highlights#create"
  post "highlighters/new", to: "highlighters#create"
  post "projects/new", to: "projects#create"
  post "pages/new", to: "pages#create"
  post "notes/new", to: "notes#create"

  # Session related
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy", as: "logout"
  post "users/new", to: "users#create", as: "signup"

  # Settings page
  patch "projects", to: "projects#add_collab"
  delete "projects/:project_id", to: "projects#destroy"
  get "pages_min/:project_id", to: "pages#get_pages_min"
  delete "pages/:page_id", to: "pages#destroy"
  get "highlighters_min/:project_id", to: "highlighters#get_highlighters_min"
  delete "highlighters/:highlighter_id", to: "highlighters#destroy"

  get "/data_change", to: "projects#data_change"



end
