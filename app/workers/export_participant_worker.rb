# frozen_string_literal: true

class ExportParticipantWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform(id)
    report_export_files = Dir[Rails.root.join("tmp", "report_export_*.xlsx")]
    report_export_files.each do |file|
      FileUtils.rm file
    end
    current_user = User.find_by(id: id)
    report =
    Attempt.where(submitted: true, quiz: current_user.quizzes).joins(:user, :quiz)
      .select("attempts.*, quizzes.quiz_name, users.first_name, users.last_name, users.email")
    total report.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Quiz\ Name User\ Name Email Correct\ Answers Incorrect\ Answers)
      report.each.with_index(1) do |attempt, idx|
        worksheet.add_row [attempt.quiz_name, "#{attempt.first_name} #{attempt.last_name}", attempt.email,
attempt.correct_answers_count, attempt.incorrect_answers_count]
        at idx
        sleep 10
      end
    end
    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
