# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = build(:question)
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_question_should_be_invalid_without_questn
    @question.questn = ""
    assert @question.invalid?
  end

  def test_question_should_be_invalid_without_option1
    @question.option1 = ""
    assert @question.invalid?
  end

  def test_question_should_be_invalid_without_answer
    @question.answer = nil
    assert @question.invalid?
  end

  def test_question_should_be_invalid_without_option2
    @question.option2 = ""
    assert @question.invalid?
  end

  def test_question_should_be_valid_without_option3
    @question.option3 = ""
    assert @question.valid?
  end

  def test_question_should_be_valid_without_option4
    @question.option4 = ""
    assert @question.valid?
  end

  def test_valid_question_should_be_saved
    assert_difference "Question.count" do
      @question.save
    end
  end

  def test_question_should_not_be_valid_wihtout_quiz
    @question.quiz = nil
    assert @question.invalid?
  end
end
