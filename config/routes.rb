# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create]
    resources :quizzes, except: %i[new edit] do
      put "publish", on: :member, param: :id
    end
    resources :questions, only: %i[create show update destroy]
    resources :public_quizzes, only: %i[show], param: :slug
    resources :users, only: %i[create index export ]
    resources :participants, only: %i[update show]
    resources :reports, only: %i[export export_status generate_report], param: :job_id do
      member do
        get "export_status"
      end
      collection do
        get "export"
        get "generate_report"
      end
    end
  end
  defaults format: :xlsx do
    resources :reports, only: :export_download, param: :job_id do
      get "export_download", member: :on
    end
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
