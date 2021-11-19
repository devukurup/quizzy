# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    submitted { "MyText" }
    user { nil }
    quiz { nil }
  end
end
