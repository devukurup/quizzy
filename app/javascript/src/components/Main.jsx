import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Authentication/Login";
import PrivateRoute from "./Common/PrivateRoute";
import Dashboard from "./Dashboard";
import CreateNewQuiz from "./Dashboard/CreateNewQuiz";
import EditQuiz from "./Dashboard/EditQuiz";
import ShowQuiz from "./Dashboard/ShowQuiz";
import Navbar from "./Navbar";
import Home from "./Participant/Home";
import NotFound from "./Participant/NotFound";
import Verify from "./Participant/Verify";
import AddQuestion from "./Questions";
import EditQuestion from "./Questions/EditQuestion";
import Report from "./Report";

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
    return <PageLoader />;
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
          <Route exact path="/showQuiz/:id" component={ShowQuiz} />
          <Route exact path="/Question/add/:id" component={AddQuestion} />
          <Route exact path="/public/notfound" component={NotFound} />
          <Route
            exact
            path="/showQuiz/Question/edit/:id"
            component={EditQuestion}
          />
          <Route exact path="/reports" component={Report} />
          <Route exact path="/public/:id/:slug/attempt/new" component={Home} />
          <Route exact path="/public/:id/:slug" component={Verify} />
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
