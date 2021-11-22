# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    correct_answers_count { rand(1..10) }
    incorrect_answers_count { rand(1..10) }
    user
    quiz
  end
end
