import React from "react";

import Main from "./components/Main";
import { AuthProvider } from "./contexts/auth";
import { ParticipantProvider } from "./contexts/participant";
import { QuestionProvider } from "./contexts/question";
import { QuizProvider } from "./contexts/quiz";

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <QuestionProvider>
          <ParticipantProvider>
            <Main />
          </ParticipantProvider>
        </QuestionProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
