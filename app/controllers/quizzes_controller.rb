# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show update destroy]

  def index
    quizzes = current_user.quizzes.order("created_at DESC")
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = current_user.quizzes.new(quiz_params)
    authorize @quiz
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.successfully_created") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    authorize @quiz
    render status: :ok, json: { quiz: @quiz }
  end

  def update
    authorize @quiz
    if @quiz && quiz_params["publish"] && @quiz.update(quiz_params.merge({ "slug" => set_slug }))
      render status: :ok, json: { notice: t("quiz.successfully_updated") }
    elsif @quiz && @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:quiz_name, :publish)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end

    def set_slug
      quiz_name_slug = @quiz.quiz_name.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_quiz_slug = Quiz.where(
        regex_pattern,
        "#{quiz_name_slug}$|#{quiz_name_slug}-[0-9]+$"
      ).order(slug: :desc).first&.slug
      slug_count = 0
      if latest_quiz_slug.present?
        slug_count = latest_quiz_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{quiz_name_slug}-#{slug_count + 1}" : quiz_name_slug
      slug_candidate
    end
end
