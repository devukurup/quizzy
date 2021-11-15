# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    quizzes = Quiz.where(user_id: current_user.id).order("created_at DESC")
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: current_user.id))
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    quiz = Quiz.where(id: params[:id])
    render status: :ok, json: { quiz: quiz }
  end

  def update
    quiz = Quiz.find_by(id: params[:id])
    if quiz && quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    quiz = Quiz.find_by(id: params[:id])
    if quiz.destroy
      render status: :ok, json: { notice: t("quiz.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name)
    end
end
