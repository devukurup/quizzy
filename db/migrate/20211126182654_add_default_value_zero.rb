# frozen_string_literal: true

class AddDefaultValueZero < ActiveRecord::Migration[6.1]
  def change
    change_column :attempts, :correct_answers_count, :integer, default: 0
    change_column :attempts, :incorrect_answers_count, :integer, default: 0
  end
end
