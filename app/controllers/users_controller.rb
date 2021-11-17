# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])
    if !user
      new_user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      if new_user.save
        render status: :ok, json: { notice: t("user.successfully_created") }
      else
        errors = new_user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
end
