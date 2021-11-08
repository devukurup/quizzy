import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
