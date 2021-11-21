# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :create
  def create
    user = User.find_by(email: user_params[:email])
    if !user
      user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      unless user.save
        errors = user.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    attempt = Attempt.find_by(user_id: user.id, quiz_id: quiz_params[:quiz_id])
    if !attempt
      attempt = Attempt.new(user_id: user.id, quiz_id: quiz_params[:quiz_id])
      unless attempt.save
        errors = attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors }
      end
    end
    render status: :ok, json: { attempt: attempt }
  end

  def index
    id = current_user.id
    quiz = Quiz.where(user_id: id).select("quizzes.slug")
    report =
    Attempt.joins("INNER JOIN users ON users.id = attempts.user_id INNER JOIN quizzes ON quizzes.id = attempts.quiz_id")
      .where("attempts.submitted = true").select("users.first_name, users.last_name, users.email,
    attempts.correct_answers_count, attempts.incorrect_answers_count, quizzes.quiz_name, quizzes.slug")
    quizList = quiz.map { |item| item.slug }
    report = report.select do |item|
      item.slug.in?(quizList)
    end
    render status: :ok, json: { Report: report }
  end

  private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end

    def quiz_params
      params.require(:quiz).permit(:quiz_id, :quiz_name)
    end
end
