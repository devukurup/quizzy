# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  # test for user model validity
  def test_user_should_be_valid
    assert @user.valid?
  end

  # test to check if user is invalid with blank first_name
  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  # test to check if user is invalid with blank last_name
  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  # test to check if user is invalid with blank email
  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  # test to check if user is invalid when length of first_name exceeds specified maximum length
  def test_first_name_should_be_invalid_if_length_exceeds_maximum_length
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name is too long (maximum is 50 characters)"
  end

  # test to check if user is valid when length of first_name is within specified length
  def test_first_name_should_be_valid_with_valid_length
    @user.first_name = "a" * 50
    assert @user.valid?
  end

  # test to check if user is invalid when length of last_name exceeds specified maximum length
  def test_last_name_should_be_invalid_if_length_exceeds_maximum_length
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name is too long (maximum is 50 characters)"
  end

  # test to check if user is valid when length of last_name is within specified length
  def test_last_name_should_be_valid_with_valid_length
    @user.last_name = "a" * 50
    assert @user.valid?
  end

  # test to check the uniqueness of email
  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
    test_user = @user.dup
    assert test_user.invalid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  # test to check if email is saved in lowercase
  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.update!(email: uppercase_email)
    assert_equal uppercase_email.downcase, @user.email
  end

  # test to check if valid email addresses are accepted
  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in ]
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  # test to check if invalid email formats are rejected
  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com
fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
      assert_includes @user.errors.full_messages, "Email is invalid"
    end
  end

  # test to reject invalid roles
  def test_validation_should_reject_invalid_role
    error = assert_raises ArgumentError do
      @user.role = "manager"
    end
    assert_equal error.message, "'manager' is not a valid role"
  end

  # test to accpet valid roles
  def test_role_should_be_saved_with_default_value
    @user.save!
    assert @user.valid?
  end

  # def test_user_role_should_be_equal_to_default_role
  #   @user.save!
  #   assert_equal @user.role, "standard"
  # end

  # test to check if blank password field is valid
  def test_password_should_not_be_blank
    @user.password = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password can't be blank", "Password confirmation can't be blank"
  end

  # test to check if blank password_confirmation field is valid
  def test_password_confirmation_should_not_be_blank
    @user.password_confirmation = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  # test to check if password is valid with length less than minimum length
  def test_password_should_have_minimum_length
    @user.password = "a" * 4
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password", "Password is too short (minimum is 5 characters)"
  end

  # test to check if password and password_confirmation matches with different values
  def test_password_and_password_confirmation_should_match
    @user.password = "oliver@123"
    @user.password_confirmation = "Oliver@234"
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end
end
