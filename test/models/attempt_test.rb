# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @attempt = build(:attempt)
  end

  def test_attempt_should_be_valid
    assert @attempt.valid?
  end

  def test_attempt_should_be_invalid_without_quiz
    @attempt.quiz = nil
    assert @attempt.invalid?
  end

  def test_attempt_should_be_invalid_without_user
    @attempt.user = nil
    assert @attempt.invalid?
  end

  def test_submitted_should_have_a_default_value
    @attempt.save
    assert_equal @attempt.submitted, false
  end

  def test_submitted_should_be_valid_with_value_true
    @attempt.submitted = true
    assert @attempt.valid?
  end
end
