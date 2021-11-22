import React, { useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";

import { setAuthHeaders } from "../../apis/axios";
import { useQuiz } from "../../contexts/quiz";
import FetchQuiz from "../Quiz/Table";

const Dashboard = () => {
  const { dashboardHeader } = useQuiz();
  const history = useHistory();
  useEffect(() => {
    setAuthHeaders();
  }, []);

  return (
    <div>
      <div className="flex justify-between p-16">
        <div>
          {dashboardHeader && (
            <Typography style="h1" weight="extrabold">
              List of quizzes
            </Typography>
          )}
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            history.push("/createNewQuiz");
          }}
          iconPosition="left"
          label=" Add new quiz"
        />
      </div>
      <div>
        <FetchQuiz />
      </div>
    </div>
  );
};

export default Dashboard;
