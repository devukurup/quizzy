import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import authApi from "../../../apis/auth";
import { setAuthHeaders } from "../../../apis/axios";
import { useAuth } from "../../../contexts/auth";
import { setToLocalStorage } from "../../../helpers/storage";

const Login = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string().required("Password is required"),
    });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async data => {
    try {
      const email = data.email;
      const password = data.password;
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        user_name: `${response.data.first_name} ${response.data.last_name}`,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  if (isLoggedIn) {
    setToLocalStorage({
      authToken: null,
      email: null,
      userId: null,
      user_name: null,
    });
    history.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center mx-auto my-48 space-y-3 w-6/12 p-12 hover:neeto-ui-shadow-m">
      <Typography className="text-center p-3" style="h1" weight="bold">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="space-y-2 flex flex-col">
            <div className="w-full">
              <Field name="email" type="email">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    error={meta.touched && meta.error}
                    placeholder="email"
                  />
                )}
              </Field>
            </div>
            <div>
              <Field name="password" type="password">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="password"
                    error={meta.touched && meta.error}
                    placeholder="password"
                  />
                )}
              </Field>
            </div>

            <div className="mx-auto p-3">
              <Button type="submit" label="submit" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
