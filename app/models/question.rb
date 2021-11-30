# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_LENGTH = 255

  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates :questn, presence: true, length: { maximum: MAX_LENGTH }
  validates :option1, presence: true, length: { maximum: MAX_LENGTH }
  validates :option2, presence: true, length: { maximum: MAX_LENGTH }
  validates :answer, presence: true, inclusion: { in: (1..4) }, numericality: { only_integer: true }

  validate :atleast_two_options_should_be_present, :atmost_four_options_should_be_present, :check_correct_answer_option

  private

    def atleast_two_options_should_be_present
      errors.add(:option2, "Atleast two options should be present") if option1.empty? || option2.empty?
    end

    def atmost_four_options_should_be_present
      unless !option1.empty? && !option2.empty? || option3.empty? || option4.empty?
        errors.add(:questions, "Atmost four options should be present")
      end
    end

    def check_correct_answer_option
      unless answer == 1 || answer == 2 || answer == 3 && !option3.empty? || answer == 4 && !option4.empty?
        errors.add(:answer, "is invalid")
      end
    end
end
