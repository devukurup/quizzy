import React, { useState } from "react";

import PropTypes from "prop-types";

const ParticipantContext = React.createContext();

const ParticipantProvider = ({ children }) => {
  const [signUp, setSignUp] = useState(true);
  const [quiz, setQuiz] = useState(false);
  const [result, setResult] = useState(false);

  const initialValues = {
    signUp,
    setSignUp,
    quiz,
    setQuiz,
    result,
    setResult,
  };
  return (
    <ParticipantContext.Provider value={initialValues}>
      {children}
    </ParticipantContext.Provider>
  );
};

const useParticipant = () => {
  const context = React.useContext(ParticipantContext);
  if (context === undefined) {
    throw new Error("useParticipant must be used within a ParticipantProvider");
  }

  return context;
};

ParticipantProvider.proptypes = {
  children: PropTypes.node,
};

export { ParticipantProvider, useParticipant };
