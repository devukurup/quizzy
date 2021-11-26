# frozen_string_literal: true

class MakeUserIdNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :quizzes, :user_id, false
  end
end
