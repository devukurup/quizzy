import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { useQuestion } from "../../contexts/question";
import FetchQuestions from "../Questions/FetchQuestions";
// import { useQuiz } from "../../contexts/quiz";

const ShowQuiz = () => {
  const history = useHistory();
  const { state } = useLocation();
  const quiz_id = useParams();
  const { publish } = useQuestion();
  // console.log(quiz_id, "it is quiz_id")
  const id = quiz_id?.id;
  return (
    <div>
      <div className="flex justify-between p-16">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state.quiz_name}
        </Typography>
        <div className="flex space-x-2">
          <Button
            icon={Plus}
            iconPosition="left"
            label=" Add questions"
            onClick={() => {
              history.push({
                pathname: `/Question/add/${state.id}`,
                state: state,
              });
            }}
          />
          {publish && <Button label="Publish" />}
        </div>
      </div>
      <FetchQuestions state={state} id={id} />
    </div>
  );
};

export default ShowQuiz;
