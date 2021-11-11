import React from "react";

import Main from "./components/Main";
import { AuthProvider } from "./contexts/auth";
import { QuizProvider } from "./contexts/quiz";

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Main />
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
