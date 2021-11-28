# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])
    if !user
      user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      unless user.save
        errors = user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    attempt = user.attempts.find_by(quiz_id: quiz_params[:quiz_id])
    if !attempt
      attempt = user.attempts.new(quiz_id: quiz_params[:quiz_id])
      unless attempt.save
        errors = attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    render status: :ok, json: { attempt: attempt }
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end

    def quiz_params
      params.require(:quiz).permit(:quiz_id)
    end
end
