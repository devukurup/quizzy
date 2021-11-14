# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    questn { Faker::Lorem.sentence[0..20] }
    option1 { Faker::Lorem.sentence[0..5] }
    option2 { Faker::Lorem.sentence[0..5] }
    option3 { Faker::Lorem.sentence[0..5] }
    option4 { Faker::Lorem.sentence[0..5] }
    answer { rand(1..4) }
    quiz
  end
end
