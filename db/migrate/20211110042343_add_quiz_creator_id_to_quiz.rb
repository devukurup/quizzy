# frozen_string_literal: true

class AddQuizCreatorIdToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :user_id, :integer
    add_foreign_key :quizzes, :users, column: :quiz_creator_id
  end
end
