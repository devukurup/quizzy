import React, { useState } from "react";

import PropTypes from "prop-types";

const QuizContext = React.createContext();

const QuizProvider = ({ children }) => {
  const [newQuiz, setNewQuiz] = useState(false);
  const initialValues = {
    newQuiz,
    setNewQuiz,
  };
  return (
    <QuizContext.Provider value={initialValues}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = React.useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
};

QuizProvider.proptypes = {
  children: PropTypes.node,
};

export { QuizProvider, useQuiz };
