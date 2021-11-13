# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    association :quiz_creator, factory: :user
    quiz_name { Faker::Lorem.sentence[0..10] }
  end
end
