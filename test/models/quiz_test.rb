# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, quiz_creator: @user)
  end

  # Add more tests on quiz_creator_id attribute
  # test for quiz model validity
  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_should_be_invalid_without_quiz_name
    @quiz.quiz_name = ""
    assert @quiz.invalid?
  end

  def test_quiz_should_be_invalid_without_user
    @quiz.quiz_creator_id = nil
    assert @quiz.invalid?
  end
end
