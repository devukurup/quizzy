# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_LENGTH = 255
  belongs_to :quiz_creator, foreign_key: "quiz_creator_id", class_name: "User"
  has_many :questions, dependent: :destroy
  validates :quiz_name, presence: true, length: { maximum: MAX_LENGTH }
end
