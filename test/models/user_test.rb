require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Oliver", last_name: "Twist", email: "oliver@example.com")
  end

  def test_user_should_not_be_valid_and_saved_without_first_name
    @user.first_name = ''
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end
  def test_user_should_not_be_valid_and_saved_without_last_name
    @user.last_name = ''
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end
  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ''
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end
  def test_first_name_should_be_of_valid_length
    @user.first_name = 'a' * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name is too long (maximum is 50 characters)"
  end
  def test_last_name_should_be_of_valid_length
    @user.last_name = 'a' * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name is too long (maximum is 50 characters)"
  end



end
