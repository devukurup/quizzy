import React, { useState } from "react";

import { Typography, Label } from "@bigbinary/neetoui/v2";
import { Input, Button } from "@bigbinary/neetoui/v2";

import authApi from "../../../apis/auth";
import { setAuthHeaders } from "../../../apis/axios";
import { setToLocalStorage } from "../../../helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      // logger.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-8 pt-40">
      <Typography style="h1" weight="extrabold">
        Login
      </Typography>

      <div className="space-y-5 w-4/12">
        <div className="grid grid-cols-2">
          <Label className="mr-5 justify-end">Email :</Label>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="grid grid-cols-2">
          <Label className="mr-5 justify-end">Password :</Label>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
      </div>

      <Button
        label="Submit"
        onClick={handleSubmit}
        className="neeto-ui-bg-info"
      />
    </div>
  );
};

export default Login;
