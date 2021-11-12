import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Authentication/Login";
import PrivateRoute from "./Common/PrivateRoute";
import Dashboard from "./Dashboard";
import CreateNewQuiz from "./Dashboard/CreateNewQuiz";
import EditQuiz from "./Dashboard/EditQuiz";
import Navbar from "./Navbar";

import { registerIntercepts, setAuthHeaders } from "../apis/axios";
import { initializeLogger } from "../common/logger";
import { useAuth } from "../contexts/auth";

const Main = () => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Router>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/createNewQuiz" component={CreateNewQuiz} />
          <Route exact path="/editQuiz/:id" component={EditQuiz} />
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Main;
