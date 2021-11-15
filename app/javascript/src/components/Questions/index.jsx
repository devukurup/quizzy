import React, { useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import CreateQuestion from "./CreateQuestion";

const AddQuestion = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [count, setCount] = useState(1);
  const [defaultAnswer, setDefaultAnswer] = useState(1);
  const [optionsList, setOptionsList] = useState([
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
  ]);
  const type = "Submit";
  const [disableAddOption, setDisableAddOption] = useState(false);
  const initialValues = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  };

  return (
    <CreateQuestion
      defaultAnswer={defaultAnswer}
      setDefaultAnswer={setDefaultAnswer}
      count={count}
      setCount={setCount}
      disableAddOption={disableAddOption}
      setDisableAddOption={setDisableAddOption}
      optionsList={optionsList}
      setOptionsList={setOptionsList}
      state={state}
      id={id}
      initialValues={initialValues}
      type={type}
    />
  );
};

export default AddQuestion;
