# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end
end
