# frozen_string_literal: true

Rails.application.routes.draw do
  resource :session, only: %i[create]
  resources :quizzes, only: %i[index create update destroy], param: :id
  root "home#index"
  get "*path", to: "home#index", via: :all
end
