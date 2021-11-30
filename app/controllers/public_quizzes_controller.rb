# frozen_string_literal: true

class PublicQuizzesController < ApplicationController
  def show
    quiz = Quiz.find_by(slug: params[:slug])
    unless quiz
      render status: :not_found, json: { error: t("quiz.not_found") }
    end
    render status: :ok, json: { quiz: quiz }
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name)
    end
end
