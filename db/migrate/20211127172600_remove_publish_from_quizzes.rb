# frozen_string_literal: true

class RemovePublishFromQuizzes < ActiveRecord::Migration[6.1]
  def change
    remove_column :quizzes, :publish, :boolean
  end
end
