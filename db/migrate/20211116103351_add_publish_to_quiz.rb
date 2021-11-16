# frozen_string_literal: true

class AddPublishToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :publish, :boolean, default: false
  end
end
