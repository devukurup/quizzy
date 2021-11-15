# frozen_string_literal: true

class QuestionsController < ApplicationController
  def index
    questions = Question.where(quiz_id: params[:id]).order("created_at DESC")
    render status: :ok, json: { question: questions }
  end

  def create
    question = Question.new(question_params)
    if question.save
      render status: :ok, json: { notice: t("questions.successfully_created") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    question = Question.find_by(id: params[:id])
    if question && question.update(question_params)
      render status: :ok, json: { notice: t("questions.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    question = Question.find_by(id: params[:id])
    if question.destroy
      render status: :ok, json: { notice: t("questions.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(:questn, :quiz_id, :option1, :option2, :option3, :option4, :answer)
    end
end
