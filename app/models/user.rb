class User < ApplicationRecord
    validates :email, presence: true
    validates :first_name, presence: true, length: { maximum: Constants::MAX_LENGTH }
    validates :last_name, presence: true, length: { maximum: Constants::MAX_LENGTH }
    before_save :to_lowercase

    private
        def to_lowercase
            email.downcase!
        end
end
