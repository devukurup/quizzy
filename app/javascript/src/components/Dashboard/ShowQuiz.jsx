import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router-dom";

const ShowQuiz = () => {
  const { state } = useLocation();
  return (
    <div>
      <div className="flex justify-between p-16">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state.quiz_name}
        </Typography>
        <Button icon={Plus} iconPosition="left" label=" Add questions" />
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
