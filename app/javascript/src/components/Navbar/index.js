import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { Link } from "react-router-dom";

import { resetAuthTokens } from "apis/axios";
import { useAuth } from "contexts/auth";
import { useQuiz } from "contexts/quiz";
import { setToLocalStorage, getFromLocalStorage } from "helpers/storage";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const userName = getFromLocalStorage("authUserName");
  const { setReport } = useQuiz();
  var host = window.location.href;

  const handleLogout = async () => {
    try {
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        user_name: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <div className="shadow-lg p-1 px-5">
        <Header
          title={
            <Link to="/">
              <Typography
                style="h1"
                weight="extrabold"
                className="cursor-pointer"
              >
                Quizzy
              </Typography>
            </Link>
          }
          actionBlock={
            isLoggedIn &&
            !host.includes("public") && (
              <div className="pr-2 flex justify-center space-x-5">
                <Typography
                  style="body1"
                  className="text-black cursor-pointer"
                  textTransform="captitalize"
                  weight="bold"
                >
                  {userName}
                </Typography>
                <Link to="/reports" onClick={() => setReport(true)}>
                  <Typography
                    className="hover:underline text-black"
                    style="body1"
                    weight="bold"
                  >
                    Reports
                  </Typography>
                </Link>
                <Link onClick={handleLogout}>
                  <Typography
                    className="hover:underline text-black"
                    style="body1"
                    weight="bold"
                  >
                    Logout
                  </Typography>
                </Link>
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default Navbar;
