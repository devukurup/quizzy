import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import Signup from "./Signup";

import publicQuizApi from "../../apis/public";
import { useQuestion } from "../../contexts/question";

const Home = () => {
  const { slug } = useParams();
  const { setQuizRecord } = useQuestion();
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    try {
      const response = await publicQuizApi.show({ slug });
      setQuizRecord(response.data.quiz[0]);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Signup />
    </div>
  );
};

export default Home;
