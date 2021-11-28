# frozen_string_literal: true

class ParticipantsController < ApplicationController
  before_action :load_attempt, only: %i[update show]

  def update
    @attempt.update(attempt_answer_params.merge(submitted: true))
  end

  def show
    attempt_answers = @attempt.attempt_answers
    render status: :ok, json: { attempt_answers: attempt_answers, count: @attempt }
  end

  private

    def attempt_answer_params
      params.require(:attempt).permit(
        :id, :correct_answers_count, :incorrect_answers_count,
        attempt_answers_attributes: [:question_id, :answer])
    end

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
      end
    end
end
