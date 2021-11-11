import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Authentication/Login";
import PrivateRoute from "./Common/PrivateRoute";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

import { registerIntercepts, setAuthHeaders } from "../apis/axios";
import { initializeLogger } from "../common/logger";
import { getFromLocalStorage } from "../helpers/storage";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

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
        <Navbar isLoggedIn={isLoggedIn} />
        <ToastContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
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
