# frozen_string_literal: true

class CreateQuiz < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :quiz_name, null: false
      t.timestamps
    end
  end
end
