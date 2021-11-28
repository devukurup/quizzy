# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_LENGTH = 255

  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates :questn, presence: true, length: { maximum: MAX_LENGTH }
  validates :option1, presence: true, length: { maximum: MAX_LENGTH }
  validates :option2, presence: true, length: { maximum: MAX_LENGTH }
  validates :answer, presence: true, inclusion: { in: (1..4) }, numericality: { only_integer: true }

  before_validation :atleast_two_options_should_be_present

  private

    def atleast_two_options_should_be_present
      errors.add(:option2, "Atleast two options should be present") if option1.empty? || option2.empty?
    end
end
