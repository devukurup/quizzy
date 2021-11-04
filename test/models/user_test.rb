# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Oliver", last_name: "Twist", email: "oliver@example.com", role: "standard",
      password: "welcome", password_confirmation: "welcome")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_invalid_user
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name is too long (maximum is 50 characters)"
  end

  def test_first_name_valid_with_valid_length
    @user.first_name = "a" * 49
    assert @user.valid?
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name is too long (maximum is 50 characters)"
  end

  def test_last_name_valid_with_valid_length
    @user.last_name = "a" * 49
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in ]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com
fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
      assert_includes @user.errors.full_messages, "Email is invalid"
    end
  end

  def test_validation_should_reject_invalid_role
    error = assert_raises ArgumentError do
      @user.role = "manager"
    end
    assert_equal error.message, "'manager' is not a valid role"
  end

  def test_validation_should_accept_valid_role
    @user.role = "standard"
    assert @user.valid?
  end

  def test_password_should_not_be_blank
    @user.password = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password can't be blank", "Password confirmation can't be blank"
  end

  def test_password_confirmation_should_not_be_blank
    @user.password = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password can't be blank", "Password confirmation can't be blank"
  end

  def test_password_should_have_minimum_length
    @user.password = "a" * 4
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password", "Password is too short (minimum is 5 characters)"
  end

  def test_password_and_password_confirmation_should_match
    @user.password = "oliver@123"
    @user.password_confirmation = "Oliver@234"
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
