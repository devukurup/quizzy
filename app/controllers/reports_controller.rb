# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :export
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
