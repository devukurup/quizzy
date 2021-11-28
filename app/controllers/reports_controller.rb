# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[export generate_report]

  def generate_report
    quiz = current_user.quizzes.select("quizzes.slug")
    report =
    Attempt.joins("INNER JOIN users ON users.id = attempts.user_id INNER JOIN quizzes ON quizzes.id = attempts.quiz_id")
      .where("attempts.submitted = true").select("users.first_name, users.last_name, users.email,
    attempts.correct_answers_count, attempts.incorrect_answers_count, quizzes.quiz_name, quizzes.slug")
    quizList = quiz.map { |item| item.slug }
    report = report.select do |item|
      item.slug.in?(quizList)
    end
    render status: :ok, json: { Report: report }
  end

  def export
    job_id = ExportParticipantWorker.perform_async(current_user.id)
    render json: { jid: job_id }
  end

  def export_status
    job_id = params[:job_id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys
    render json: { status: job_status[:status], percentage: job_status[:pct_complete] }
  end

  def export_download
    job_id = params[:job_id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    filename = "QuizReportData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"
    respond_to do |format|
      format.xlsx do
        send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
      end
    end
  end
end
