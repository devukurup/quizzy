import React from "react";

import PropTypes from "prop-types";
// import { getFromLocalStorage } from '../helpers/storage';
// import { either, isNil, isEmpty } from 'ramda';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const initialValues = {};
  return (
    <AuthContext.Provider value={initialValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
};

AuthProvider.proptypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuth };
