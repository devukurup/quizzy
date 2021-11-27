import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import publicQuizApi from "apis/public";
import { useParticipant } from "contexts/participant";
import { useQuestion } from "contexts/question";
import Result from "Participant/Result";

import Quiz from "./Quiz";
import Signup from "./Signup";

const Home = () => {
  const { slug } = useParams();
  const { setQuizRecord } = useQuestion();
  const { signUp, quiz, isSubmitted } = useParticipant();
  const fetchQuiz = async () => {
    try {
      const response = await publicQuizApi.show({ slug });
      setQuizRecord(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div>
      {signUp && <Signup />}
      {quiz && !isSubmitted && <Quiz />}
      {isSubmitted && <Result />}
    </div>
  );
};

export default Home;
