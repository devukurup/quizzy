import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory, useLocation } from "react-router-dom";

const ShowQuiz = () => {
  const history = useHistory();
  const { state } = useLocation();
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
              state: state.quiz_name,
            });
          }}
        />
      </div>
      <div className="align-middle text-center pt-40">
        <Typography style="h3" weight="extralight">
          There are no questions in this quiz.
        </Typography>
      </div>
    </div>
  );
};

export default ShowQuiz;
