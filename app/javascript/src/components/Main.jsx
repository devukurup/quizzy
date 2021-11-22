import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import AddQuestion from "Questions";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Login from "Authentication/Login";
import { initializeLogger } from "common/logger";
import PrivateRoute from "Common/PrivateRoute";
import { useAuth } from "contexts/auth";
import Home from "Participant/Home";
import NotFound from "Participant/NotFound";
import Verify from "Participant/Verify";
import EditQuestion from "Questions/Edit";
import CreateNewQuiz from "Quiz/Create";
import EditQuiz from "Quiz/Edit";
import ShowQuiz from "Quiz/Show";

import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Report from "./Report";

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
          <PrivateRoute
            condition={isLoggedIn}
            redirectRoute="/login"
            path="/createNewQuiz"
            component={CreateNewQuiz}
          />
          <PrivateRoute
            condition={isLoggedIn}
            redirectRoute="/login"
            path="/editQuiz/:id"
            component={EditQuiz}
          />
          <PrivateRoute
            condition={isLoggedIn}
            redirectRoute="/login"
            path="/showQuiz/:id"
            component={ShowQuiz}
          />
          <PrivateRoute
            condition={isLoggedIn}
            redirectRoute="/login"
            path="/Question/add/:id"
            component={AddQuestion}
          />
          <Route path="/public/notfound" component={NotFound} />
          <PrivateRoute
            exact
            path="/showQuiz/Question/edit/:id"
            component={EditQuestion}
          />
          <PrivateRoute
            path="/reports"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Report}
          />
          {/* <Route exact path="/reports" component={Report} /> */}
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
