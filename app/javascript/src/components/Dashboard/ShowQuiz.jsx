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
  var host =
    window.location.protocol + "//" + window.location.host + "/public/";

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
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between pt-16 px-16 pb-10">
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
      {!publishButton && (
        <div className="flex items-center  mx-16 space-x-5">
          <Typography>Public URL</Typography>
          <a
            className="text-blue-800 hover:text-green-500"
            href={host + quizRecord.slug}
          >
            {host + quizRecord.slug}
          </a>
        </div>
      )}
      <FetchQuestions id={id} />
    </div>
  );
};

export default ShowQuiz;
