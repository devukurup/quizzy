# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @quiz = create(:quiz)
  end

  def test_should_create_new_user
    post users_path,
      params: {
        user: { email: @user.email, first_name: @user.first_name, last_name: @user.last_name },
        quiz: { quiz_id: @quiz.id, quiz_name: @quiz.quiz_name }
      }
    assert_response :success
  end
end
