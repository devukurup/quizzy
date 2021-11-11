import React from "react";

import FetchQuiz from "./FetchQuiz";

import { useQuiz } from "../../contexts/quiz";

const Dashboard = () => {
  const { newQuiz } = useQuiz();
  return <div>{!newQuiz && <FetchQuiz />}</div>;
};

export default Dashboard;
