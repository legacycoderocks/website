Rails.application.routes.draw do
  get 'main/index'

  root 'main#index'
end
