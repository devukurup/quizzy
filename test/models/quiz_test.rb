# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(quiz_name: "Science Quiz")
  end

  # Add more tests on quiz_creator_id attribute
  # test for quiz model validity
  # def test_quiz_should_be_valid
  #   assert @quiz.valid?
  # end
end
