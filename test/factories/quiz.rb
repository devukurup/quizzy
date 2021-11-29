# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do

    quiz_name { Faker::Lorem.sentence[0..10] }
    user
  end
end
