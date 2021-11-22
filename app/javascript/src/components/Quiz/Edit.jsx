import React, { useState } from "react";

import { Typography, Button, Input, Label } from "@bigbinary/neetoui/v2";
import { useHistory, useLocation, useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

const EditQuiz = () => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const [name, setName] = useState(state.quiz_name);
  const handleSubmit = async event => {
    const quiz_name = name;
    event.preventDefault();
    try {
      await quizzesApi.update({
        id,
        payload: { quiz: { quiz_name } },
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-5 mx-auto w-6/12 bg-gray-300 p-24 mt-24">
        <Typography style="h2">Edit Quiz</Typography>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-row">
            <Label className="mr-5 justify-end">Quiz Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="flex space-x-5 ">
            <Button label="Update" type="submit" onClick={handleSubmit} />
            <Button label="Cancel" onClick={() => history.push("/")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
