import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";

import { useQuiz } from "contexts/quiz";
import FetchQuiz from "Quiz/Table";

const Dashboard = () => {
  const { dashboardHeader } = useQuiz();
  const history = useHistory();

  return (
    <div>
      <div className="flex justify-between p-16">
        <div>
          {dashboardHeader && (
            <Typography style="h1" weight="bold">
              Your Quizzes
            </Typography>
          )}
        </div>
        <Button
          icon={Plus}
          style="secondary"
          onClick={() => {
            history.push("/quiz/new");
          }}
          iconPosition="left"
          label=" Add a new quiz"
        />
      </div>
      <div>
        <FetchQuiz />
      </div>
    </div>
  );
};

export default Dashboard;
