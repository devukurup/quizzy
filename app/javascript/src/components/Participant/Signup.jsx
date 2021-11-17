import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import usersApi from "../../apis/user";
import { useParticipant } from "../../contexts/participant";
import { useQuestion } from "../../contexts/question";

const Signup = () => {
  const { quizRecord } = useQuestion();
  const { setSignUp, setQuiz } = useParticipant();

  const validationSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Email is invalid"),
    });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const handleSubmit = async data => {
    const email = data.email;
    const first_name = data.firstName;
    const last_name = data.lastName;
    try {
      await usersApi.create({
        user: {
          email,
          first_name,
          last_name,
        },
      });
      setSignUp(false);
      setQuiz(true);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto my-40 space-y-10 w-7/12 p-10 hover:neeto-ui-shadow-m">
      <Typography className="text-center p-3" style="h1" weight="bold">
        Welcome to {quizRecord.quiz_name}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="">
          <div className="space-y-5 flex flex-col">
            <div>
              <Input
                className="w-44"
                name="firstName"
                type="type"
                placeholder="First Name"
              />
            </div>
            <div>
              <Input
                className="w-44"
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <Input
                className=""
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="mx-auto p-3">
              <Button type="submit" label="Next" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
