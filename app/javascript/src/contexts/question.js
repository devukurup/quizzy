import React, { useState } from "react";

import PropTypes from "prop-types";

const QuestionContext = React.createContext();

const QuestionProvider = ({ children }) => {
  const [quizRecord, setQuizRecord] = useState({});
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [publish, setPublish] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const initialValues = {
    questionName,
    setQuestionName,
    deleteQuestion,
    setDeleteQuestion,
    publish,
    setPublish,
    deleteId,
    setDeleteId,
    quizRecord,
    setQuizRecord,
    questionList,
    setQuestionList,
  };
  return (
    <QuestionContext.Provider value={initialValues}>
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestion = () => {
  const context = React.useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }

  return context;
};

QuestionProvider.proptypes = {
  children: PropTypes.node,
};

export { QuestionProvider, useQuestion };
