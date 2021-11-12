# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz
  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def show?
    quiz.quiz_creator_id == user.id
  end

  class Scope
    attr_reader :user, :Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(quiz_creator_id: user.id)
    end
  end
end
