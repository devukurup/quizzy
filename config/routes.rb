# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create]
    resources :quizzes, except: %i[new edit] do
      put "publish", on: :member, param: :id
    end
    resources :questions, only: %i[create index update destroy]
    resources :public_quizzes, only: %i[show], param: :slug
    resources :users, only: %i[create index export ]
    resources :participants, only: %i[update show]
    resources :reports, only: :generate_report do
      collection do
        get "generate_report"
      end

    end
    get "/export", to: "reports#export"
    get "/export_status/:job_id", to: "reports#export_status", param: :job_id
  end
  defaults format: :xlsx do
    get "/export_download/:job_id", to: "reports#export_download", param: :job_id
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
