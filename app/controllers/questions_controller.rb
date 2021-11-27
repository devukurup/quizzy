# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :create
  before_action :load_question, only: %i[update destroy]
  before_action :load_quiz, only: %i[create]

  def index
    questions = Question.where(quiz_id: params[:id])
    render status: :ok, json: { question: questions }
  end

  def create
    question = @quiz.questions.new(question_params)
    authorize @quiz
    if question.save
      render status: :ok, json: { notice: t("questions.successfully_created") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: t("questions.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("questions.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(:questn, :option1, :option2, :option3, :option4, :answer)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:question][:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("question.not_found") }
      end
    end
end
