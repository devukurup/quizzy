import React, { useEffect, useState } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Radio } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import participantsApi from "../../apis/participant";
import { useParticipant } from "../../contexts/participant";
import { useQuestion } from "../../contexts/question";

const Result = () => {
  const { quizRecord, questionList } = useQuestion();
  const { attemptId, isSubmitted } = useParticipant();
  const [answerList, setAnswerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  useEffect(() => {
    fetchAnswers();
  }, [attemptId, isSubmitted]);

  useEffect(() => {
    setCorrectAnswerCount(0);
    setWrongAnswerCount(0);
    scoreCount();
  }, [answerList]);

  const fetchAnswers = async () => {
    const id = attemptId;
    try {
      const response = await participantsApi.show({ id });
      setAnswerList(() => response.data.attempt_answers);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const scoreCount = () => {
    questionList.map((item, index) => {
      if (item.answer == answerList?.[index]?.answer) {
        setCorrectAnswerCount(prev => prev + 1);
      } else {
        setWrongAnswerCount(prev => prev + 1);
      }
    });
  };

  if (loading) {
    return (
      <div className="mx-auto pt-48">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <div className="mt-10 p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {quizRecord.quiz_name} Results
        </Typography>
        <div className="flex space-x-4 w-6/12">
          <div className="bg-green-500 p-2 m-5 ">
            <Typography>Correct: {correctAnswerCount}</Typography>
          </div>
          <div className="bg-red-500 p-2 m-5">
            <Typography>Wrong: {wrongAnswerCount}</Typography>
          </div>
        </div>
      </div>
      {questionList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-10 m-10 bg-blue-100 space-y-7"
        >
          <Typography style="body2" weight="bold">
            {item.questn}
          </Typography>
          <Radio className=" flex flex-col space-y-3" stacked>
            <div className="flex space-x-5  p-3">
              <Radio.Item
                label={
                  <Typography weight="bold" style="body1">
                    {item.option1}
                  </Typography>
                }
                value={item.option1}
                checked={answerList?.[index]?.answer == "1"}
                disabled="true"
              />
              {item.answer == "1" && <CheckCircle color="#00ba88" size={24} />}
            </div>
            <div className="flex space-x-5  p-3">
              <Radio.Item
                label={
                  <Typography weight="bold" style="body1">
                    {item.option2}
                  </Typography>
                }
                value={item.option2}
                checked={answerList?.[index]?.answer == "2"}
                disabled="true"
              />
              {item.answer == "2" && <CheckCircle color="#00ba88" size={24} />}
            </div>
            <div className="flex space-x-5  p-3">
              {item.option3 && (
                <Radio.Item
                  label={
                    <Typography weight="bold" style="body1">
                      {item.option3}
                    </Typography>
                  }
                  value={item.option3}
                  checked={answerList?.[index]?.answer == "3"}
                  disabled="true"
                />
              )}
              {item.answer == "3" && <CheckCircle color="#00ba88" size={24} />}
            </div>
            <div className="flex space-x-5  p-3">
              {item.option4 && (
                <Radio.Item
                  label={
                    <Typography weight="bold" style="body1">
                      {item.option4}
                    </Typography>
                  }
                  value={item.option4}
                  checked={answerList?.[index]?.answer == "4"}
                  disabled="true"
                />
              )}
              {item.answer == "4" && <CheckCircle color="#00ba88" size={24} />}
            </div>
          </Radio>
        </div>
      ))}
    </div>
  );
};

export default Result;
