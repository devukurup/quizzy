# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    user.id == quiz.user_id
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def create?
    show? and user.role == "administrator"
  end

  def publish?
    show?
  end
end
