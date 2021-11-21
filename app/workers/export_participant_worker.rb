# frozen_string_literal: true

class ExportParticipantWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform
    report =
    Attempt.joins("INNER JOIN users ON users.id = attempts.user_id INNER JOIN quizzes ON quizzes.id = attempts.quiz_id")
      .where("attempts.submitted = true").select("users.first_name, users.last_name, users.email,
    attempts.correct_answers_count, attempts.incorrect_answers_count, quizzes.quiz_name")
    total report.size
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
      worksheet.add_row %w(Quiz\ Name User\ Name Email Correct\ Answers Incorrect\ Answers)
      report.each.with_index(1) do |attempt, idx|
        # worksheet.add_row attempt
        worksheet.add_row [attempt.quiz_name, "#{attempt.first_name} #{attempt.last_name}", attempt.email,
attempt.correct_answers_count, attempt.incorrect_answers_count]
        at idx
        sleep 0.5
      end
    end
    xlsx_package.serialize Rails.root.join("tmp", "report_export_#{self.jid}.xlsx")
  end
end
