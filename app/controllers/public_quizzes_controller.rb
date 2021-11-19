# frozen_string_literal: true

class PublicQuizzesController < ApplicationController
  def show
    quiz = Quiz.where(slug: params[:slug])
    render status: :ok, json: { quiz: quiz }
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name)
    end
end
