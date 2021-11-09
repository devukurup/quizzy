# frozen_string_literal: true

json.extract! @user,
  :id,
  :authentication_token,
  :first_name,
  :last_name
