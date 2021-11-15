import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory, useLocation, useParams } from "react-router-dom";

import FetchQuestions from "../Questions/FetchQuestions";

const ShowQuiz = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { id } = useParams();
  return (
    <div>
      <div className="flex justify-between p-16">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state.quiz_name}
        </Typography>
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
      </div>
      <FetchQuestions state={state} id={id} />
    </div>
  );
};

export default ShowQuiz;
