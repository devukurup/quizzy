import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import Quiz from "./Quiz";
import Signup from "./Signup";

import publicQuizApi from "../../apis/public";
import questionsApi from "../../apis/questions";
import { useParticipant } from "../../contexts/participant";
import { useQuestion } from "../../contexts/question";

const Home = () => {
  const { slug, id } = useParams();
  const { setQuizRecord, setQuestionList } = useQuestion();
  const { signUp, quiz } = useParticipant();
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
      {quiz && <Quiz />}
    </div>
  );
};

export default Home;
