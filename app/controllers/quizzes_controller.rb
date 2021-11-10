# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    quiz = Quiz.new(quiz_params)
    if quiz.save!
      render status: :ok, json: { notice: "Successfully created new Quiz" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name)
    end
end
