import React, { useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useHistory } from "react-router-dom";

import FetchQuiz from "./FetchQuiz";

import { setAuthHeaders } from "../../apis/axios";
import { useQuiz } from "../../contexts/quiz";

const Dashboard = () => {
  useEffect(() => {
    setAuthHeaders();
  }, []);
  const { setNewQuiz } = useQuiz();
  const history = useHistory();
  return (
    <div>
      <div className="flex justify-between p-16">
        <Typography style="h1" weight="extrabold">
          List of quizzes
        </Typography>
        <Button
          icon={Plus}
          onClick={() => {
            history.push("/createNewQuiz");
            setNewQuiz(true);
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
