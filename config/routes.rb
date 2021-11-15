# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create]
    resources :quizzes, only: %i[index create update destroy], param: :id
    resources :questions, only: %i[create index update destroy], param: :id
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
