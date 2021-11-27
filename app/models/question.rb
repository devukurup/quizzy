# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_LENGTH = 255

  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates :questn, presence: true, length: { maximum: MAX_LENGTH }
  validates :option1, presence: true, length: { maximum: MAX_LENGTH }
  validates :option2, presence: true, length: { maximum: MAX_LENGTH }
  validates :answer, presence: true
end
