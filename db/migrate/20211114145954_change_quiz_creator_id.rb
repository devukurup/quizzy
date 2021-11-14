# frozen_string_literal: true

class ChangeQuizCreatorId < ActiveRecord::Migration[6.1]
  def change
    rename_column :quizzes, :quiz_creator_id, :user_id
  end
end
