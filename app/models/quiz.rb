# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_LENGTH = 255
  validates :quiz_name, presence: true, length: { maximum: MAX_LENGTH }
end
