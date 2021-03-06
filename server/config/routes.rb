Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, constraints: { format: :json }, defaults: { format: :json } do
    resources :operators, only: [:index, :update, :show]
    resources :products, only: [:index, :destroy]
    resources :postes, only: %i(index)
    resources :items, only: [:index, :create, :destroy, :update]
    resources :operators_postes, only: [:index, :create]
  end
end
