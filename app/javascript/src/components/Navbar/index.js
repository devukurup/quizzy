import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import { setToLocalStorage } from "../../helpers/storage";

const Navbar = ({ isLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      // logger.error(error);
    }
  };
  return (
    <div className="neeto-ui-shadow-s">
      <Header
        title={
          <Typography style="h1" weight="extrabold">
            Quizzy
          </Typography>
        }
        actionBlock={
          isLoggedIn && <Button label="Logout" onClick={handleLogout} />
        }
      />
    </div>
  );
};

export default Navbar;
