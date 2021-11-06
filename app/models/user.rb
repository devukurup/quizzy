# frozen_string_literal: true

class User < ApplicationRecord
  enum role: %i[standard administrator]
  MAX_LENGTH = 50
  VALID_EMAIL = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  has_secure_password

  before_save :to_email_lowercase

  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL }
  validates :first_name, presence: true, length: { maximum: MAX_LENGTH }
  validates :last_name, presence: true, length: { maximum: MAX_LENGTH }
  validates :password, length: { minimum: 5 }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  private

    def to_email_lowercase
      email.downcase!
    end
end
