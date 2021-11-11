import React from "react";

import Main from "./components/Main";
import { AuthProvider } from "./contexts/auth";

const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

export default App;
