import React, { useEffect, useState } from "react";

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
  const id = quiz_id?.id;
  const [publishButton, setpublishButton] = useState(publish);

  useEffect(() => {
    fetchQuiz();
  }, [id, publishButton]);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show({ id });
      setQuizRecord(response.data.quiz[0]);
      setpublishButton(!quizRecord.publish);
    } catch (error) {
      logger.error(error);
    }
  };

  const handlePublished = async () => {
    setpublishButton(false);
    try {
      await quizzesApi.update({
        id,
        payload: { quiz: { publish: publishButton } },
      });
      // history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

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
          {publish && (
            <Button
              disabled={!publishButton}
              label={publishButton ? "Publish" : "Published"}
              onClick={handlePublished}
            />
          )}
        </div>
      </div>
      <FetchQuestions id={id} />
    </div>
  );
};

export default ShowQuiz;
