import React from "react";

import Main from "./components/Main";
import { AuthProvider } from "./contexts/auth";
import { QuestionProvider } from "./contexts/question";
import { QuizProvider } from "./contexts/quiz";

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <QuestionProvider>
          <Main />
        </QuestionProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
