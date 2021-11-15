import React, { useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory, useParams } from "react-router-dom";

import quizzesApi from "../../apis/quizzes";
import { useQuestion } from "../../contexts/question";
import FetchQuestions from "../Questions/FetchQuestions";

const ShowQuiz = () => {
  const history = useHistory();
  const { quizRecord, setQuizRecord, publish } = useQuestion();
  const quiz_id = useParams();

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show({ id });
      setQuizRecord(response.data.quiz[0]);
    } catch (error) {
      logger.error(error);
    }
  };

  const id = quiz_id?.id;
  return (
    <div>
      <div className="flex justify-between p-16">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {quizRecord.quiz_name}
        </Typography>
        <div className="flex space-x-2">
          <Button
            icon={Plus}
            iconPosition="left"
            label=" Add questions"
            onClick={() => {
              history.push(`/Question/add/${id}`);
            }}
          />
          {publish && <Button label="Publish" />}
        </div>
      </div>
      <FetchQuestions id={id} />
    </div>
  );
};

export default ShowQuiz;
