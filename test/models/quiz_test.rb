# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, quiz_creator: @user)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_should_be_invalid_without_quiz_name
    @quiz.quiz_name = ""
    assert @quiz.invalid?
  end

  def test_quiz_should_be_invalid_without_user
    @quiz.user_id = nil
    assert @quiz.invalid?
  end

  def test_first_name_should_be_invalid_if_length_exceeds_maximum_length
    @quiz.quiz_name = "a" * 256
    assert @quiz.invalid?
  end

  def test_slug_value_nil_on_quiz_creation
    @quiz.save!
    assert_nil @quiz.slug
  end

  def test_default_publish_value_false
    @quiz.save!
    assert_equal @quiz.publish, false
  end
end
