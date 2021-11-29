# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[export generate_report]

  def generate_report
    report =
    Attempt.where(submitted: true, quiz: current_user.quizzes).joins(:user, :quiz)
      .select("attempts.*, quizzes.quiz_name, users.first_name, users.last_name, users.email")
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
    job_id = params[:report_job_id]
    exported_file_name = "report_export_#{job_id}.xlsx"
    send_file Rails.root.join("tmp", exported_file_name), type: :xlsx
  end
end
