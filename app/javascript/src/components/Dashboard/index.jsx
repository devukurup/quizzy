import React, { useState, useEffect } from "react";

import { either, isNil, isEmpty } from "ramda";

import quizzesApi from "../../apis/quizzes";

function Dashboard() {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizList(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      //  logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return <h1>Loading..</h1>;
  }

  if (either(isNil, isEmpty)(quizList)) {
    return (
      <div>
        <h1>No quizzes</h1>
      </div>
    );
  }

  return (
    <div>
      {quizList.map((q, index) => (
        <h1 key={index}>{q.quiz_name}</h1>
      ))}
    </div>
  );
}

export default Dashboard;
