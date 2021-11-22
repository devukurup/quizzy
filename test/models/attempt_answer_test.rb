# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @attempt_answer = build(:attempt_answer)
  end

  def test_attempt_answer_should_be_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_should_be_invalid_without_answer
    @attempt_answer.answer = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_be_invalid_without_question
    @attempt_answer.question = nil
    assert @attempt_answer.invalid?
  end

  def test_attempt_answer_should_be_invalid_without_attempt
    @attempt_answer.attempt = nil
    assert @attempt_answer.invalid?
  end
end
