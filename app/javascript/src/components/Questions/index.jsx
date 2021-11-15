import React, { useState } from "react";

import { useParams } from "react-router-dom";

import CreateQuestion from "./CreateQuestion";

const AddQuestion = () => {
  const { id } = useParams();
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

  const props = {
    defaultAnswer,
    setDefaultAnswer,
    disableAddOption,
    setDisableAddOption,
    optionsList,
    setOptionsList,
    id,
    initialValues,
    type,
  };

  return <CreateQuestion props={props} />;
};

export default AddQuestion;
