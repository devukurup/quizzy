import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { useHistory } from "react-router-dom";

import { resetAuthTokens } from "../../apis/axios";
import { useAuth } from "../../contexts/auth";
import { useQuiz } from "../../contexts/quiz";
import { setToLocalStorage, getFromLocalStorage } from "../../helpers/storage";

const Navbar = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  const { setNewQuiz } = useQuiz();
  const userName =
    getFromLocalStorage("authUserFirstName") +
    " " +
    getFromLocalStorage("authUserLastName");

  const handleLogout = async () => {
    try {
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        first_name: null,
        last_name: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <div className="border-b-2 border-black p-1">
        <Header
          title={
            <Typography
              style="h1"
              weight="extrabold"
              className="cursor-pointer"
              onClick={() => {
                setNewQuiz(false);
                history.push("/");
              }}
            >
              Quizzy
            </Typography>
          }
          actionBlock={
            isLoggedIn && (
              <div className="pr-2 space-x-3">
                <Button
                  label={
                    <Typography style="body1" component="ins" weight="bold">
                      Reports
                    </Typography>
                  }
                  style="text"
                />
                <Button
                  label={
                    <Typography style="body1" component="ins" weight="bold">
                      {userName}
                    </Typography>
                  }
                  style="text"
                />
                <Button
                  label={
                    <Typography style="body1" component="ins" weight="bold">
                      Logout
                    </Typography>
                  }
                  style="text"
                  onClick={handleLogout}
                />
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default Navbar;
