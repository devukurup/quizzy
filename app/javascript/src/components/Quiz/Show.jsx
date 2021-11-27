import React, { useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import { useQuestion } from "contexts/question";
import FetchQuestions from "Questions/Display";

const ShowQuiz = () => {
  const { quizRecord, setQuizRecord, publish } = useQuestion();
  const quiz_id = useParams();
  const id = quiz_id?.id;
  var host =
    window.location.protocol + "//" + window.location.host + "/public/";

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show({ id });
      setQuizRecord(response.data.quiz);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const handlePublished = async () => {
    try {
      await quizzesApi.publish({ id });
      fetchQuiz();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between pt-16 px-16 pb-10">
        <Typography style="h1" weight="bold">
          {quizRecord.quiz_name}
        </Typography>
        <div className="flex space-x-2">
          <Button
            icon={Plus}
            iconPosition="left"
            label="Question"
            to={`/quiz/${id}/question/new`}
          />
          {publish && (
            <Button
              disabled={quizRecord.slug ? true : false}
              label={quizRecord.slug ? "Published" : "Publish"}
              onClick={handlePublished}
            />
          )}
        </div>
      </div>
      {publish && quizRecord.slug && (
        <div className="flex items-center  mx-16 space-x-5">
          <Typography>Public URL</Typography>
          <a
            className="text-blue-800 hover:text-green-500"
            href={host + quizRecord.id + `/` + quizRecord.slug}
          >
            {host + quizRecord.id + `/` + quizRecord.slug}
          </a>
        </div>
      )}
      <FetchQuestions id={id} />
    </div>
  );
};

export default ShowQuiz;
