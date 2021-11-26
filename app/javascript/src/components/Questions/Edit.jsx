import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import CreateQuestion from "./Create";

const EditQuestion = () => {
  const { id } = useParams();
  const { state, quiz_id } = useLocation().state;
  const [defaultAnswer, setDefaultAnswer] = useState(state.answer);
  const [optionsList, setOptionsList] = useState([]);
  const [disableAddOption, setDisableAddOption] = useState(false);
  let options = ["option1", "option2", "option3", "option4"];
  const type = "Update";
  const initialValues = {
    question: state.questn,
    option1: state.option1,
    option2: state.option2,
    option3: state.option3,
    option4: state.option4,
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
    quiz_id,
  };

  const initializing = () => {
    const availableOptions = options.filter(item => state[item] != "");
    options = [];
    availableOptions.map((item, index) => {
      options.push({ id: index + 1, value: `Option ${index + 1}` });
    });
    setOptionsList(options);
    if (availableOptions.length == 4) setDisableAddOption(true);
  };

  useEffect(() => {
    initializing();
  }, []);

  return <CreateQuestion props={props} />;
};

export default EditQuestion;
