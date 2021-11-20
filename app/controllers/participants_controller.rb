# frozen_string_literal: true

class ParticipantsController < ApplicationController
  def create
    attempt = Attempt.find_by(id: attempt_answer_params[:id])
    attempt.update(attempt_answer_params.merge(submitted: true))
  end

  def show
    attempt = AttemptAnswer.where(attempt_id: params[:id])
    count = Attempt.where(id: params[:id])
    render status: :ok, json: { attempt_answers: attempt, count: count }
  end

  private

    def attempt_answer_params
      params.require(:attempt).permit(
        :id, :correct_answers_count, :incorrect_answers_count,
        attempt_answers_attributes: [:question_id, :answer])
    end
end
