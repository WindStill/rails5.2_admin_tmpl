Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: redirect('/admin')

  namespace :admin do
    root    'home#index'
    get     'sign_in' => 'sessions#new'
    delete  'sign_out' => 'sessions#destroy'
    resources :sessions, only: [:new, :create, :destroy]
  end
end
