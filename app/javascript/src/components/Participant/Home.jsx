import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import publicQuizApi from "apis/public";
import questionsApi from "apis/questions";
import { useParticipant } from "contexts/participant";
import { useQuestion } from "contexts/question";
import Result from "Participant/Result";

import Quiz from "./Quiz";
import Signup from "./Signup";

const Home = () => {
  const { slug, id } = useParams();
  const { setQuizRecord, setQuestionList } = useQuestion();
  const { signUp, quiz, isSubmitted } = useParticipant();

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await publicQuizApi.show({ slug });
      setQuizRecord(response.data.quiz[0]);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.list({ id });
      setQuestionList(response.data.question);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      {signUp && <Signup />}
      {quiz && !isSubmitted && <Quiz />}
      {isSubmitted && <Result />}
    </div>
  );
};

export default Home;
