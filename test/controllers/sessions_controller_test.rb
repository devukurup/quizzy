# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user, role: "administrator")
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { login: { email: @user.email, password: @user.password } }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @user.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    email = "user_does_not_exist@example.com"
    post session_path, params: { login: { email: email, password: "welcome" } }, as: :json
    assert_response :unauthorized
    assert_equal response.parsed_body["error"], "Incorrect credentials, try again."
  end
end
