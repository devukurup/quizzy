import React from "react";

import { Typography, Label, Input, Button } from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import authApi from "../../../apis/auth";
import { setAuthHeaders } from "../../../apis/axios";
import { setToLocalStorage } from "../../../helpers/storage";

const Login = () => {
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().required("Required").email("Email is invalid"),
      password: Yup.string().required("Required"),
    });
  };

  const handleSubmit = data => {
    handleSubmitRequest(data);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmitRequest = async data => {
    try {
      const email = data.email;
      const password = data.password;
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
      logger.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-8 pt-40">
      <Typography style="h1" weight="extrabold">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="space-y-5 ">
            <div className="grid grid-cols-2">
              <Label className="mr-5 justify-end">Email :</Label>
              <Field name="email" type="email">
                {({ field, meta }) => (
                  <Input {...field} error={meta.touched && meta.error} />
                )}
              </Field>
            </div>
            <div className="grid grid-cols-2">
              <Label className="mr-5 justify-end">Password :</Label>
              <Field name="password" type="password">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    type="password"
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            <div>
              <Button type="submit" label="submit" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
