# frozen_string_literal: true

FactoryBot.define do
  factory :attempt_answer do
    answer { Faker::Lorem.sentence[0..2] }
    question
    attempt
  end
end
