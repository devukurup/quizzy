import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import CreateQuestion from "./CreateQuestion";

const EditQuestion = () => {
  const { id } = useParams();
  const { state, quiz_id } = useLocation();
  const [count, setCount] = useState(0);
  const [defaultAnswer, setDefaultAnswer] = useState(state.answer);
  const [optionsList, setOptionsList] = useState([]);
  const [disableAddOption, setDisableAddOption] = useState(false);
  let options = ["option1", "option2", "option3", "option4"];
  const type = "Update";

  useEffect(() => {
    if (state.option4) {
      setCount(2);
      setDisableAddOption(true);
    } else if (state.option3) {
      setCount(2);
    }

    const availableOptions = options.filter(item => state[item] != "");
    options = [];
    availableOptions.map((item, index) => {
      options.push({ id: index + 1, value: `Option ${index + 1}` });
    });
    setOptionsList(options);
    if (availableOptions.length == 4) setDisableAddOption(true);
  }, []);

  // console.log(id, state, "in edit question", quiz_id)

  const initialValues = {
    question: state.questn,
    option1: state.option1,
    option2: state.option2,
    option3: state.option3,
    option4: state.option4,
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
      quiz_id={quiz_id}
    />
  );
};

export default EditQuestion;
