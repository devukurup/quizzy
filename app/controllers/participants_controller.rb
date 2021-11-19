# frozen_string_literal: true

class ParticipantsController < ApplicationController
  def create
    attempt = Attempt.find_by(id: attempt_answer_params[:id])
    attempt.update(attempt_answer_params.merge(submitted: true))
  end

  def show
    attempt = AttemptAnswer.where(attempt_id: params[:id])
    render status: :ok, json: { attempt_answers: attempt }
  end

  private

    def attempt_answer_params
      params.require(:attempt).permit(:id, attempt_answers_attributes: [:question_id, :answer])
    end
end
