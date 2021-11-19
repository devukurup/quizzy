# frozen_string_literal: true

FactoryBot.define do
  factory :attempt_answer do
    answer { "MyString" }
    question { nil }
    attempt { nil }
  end
end
