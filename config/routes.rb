# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create]
    resources :quizzes, only: %i[index show create update destroy], param: :id
    resources :questions, only: %i[create index update destroy], param: :id
    resources :public_quizzes, only: %i[show], param: :slug
    resources :users, only: %i[create]
    resources :participants, only: %i[create show], param: :id
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
