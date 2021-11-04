# frozen_string_literal: true

class AddRolesToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role, :string, default: "standard", null: false
  end
end
