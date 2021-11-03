# frozen_string_literal: true

class User < ApplicationRecord
  MAX_LENGTH = 50
  VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL }
  validates :first_name, presence: true, length: { maximum: MAX_LENGTH }
  validates :last_name, presence: true, length: { maximum: MAX_LENGTH }
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
