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
    assert_includes @question.errors.full_messages, "Questn can't be blank"
  end

  def test_question_should_be_invalid_without_option1
    @question.option1 = ""
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Option1 can't be blank"
  end

  def test_question_should_be_invalid_without_answer
    @question.answer = nil
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Answer can't be blank"
  end

  def test_question_should_be_invalid_without_option2
    @question.option2 = ""
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Option2 can't be blank"
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

  def test_question_should_not_be_valid_without_quiz
    @question.quiz = nil
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end

  def test_answer_should_not_be_valid_with_invalid_options
    @question.answer = 5
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Answer is not included in the list"
  end
end
