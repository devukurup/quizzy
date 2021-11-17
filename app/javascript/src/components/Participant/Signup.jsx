import React, { useEffect, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";

import publicQuizApi from "../../apis/public";
import usersApi from "../../apis/user";
import { useQuestion } from "../../contexts/question";

const Signup = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { quizRecord, setQuizRecord } = useQuestion();
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
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await publicQuizApi.show({ slug });
      setQuizRecord(response.data.quiz[0]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
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
    } catch (error) {
      logger.error(error);
    }

    // console.log("Submitted",data)
    // try {
    //   const email = data.email;
    //   const password = data.password;
    //   const response = await authApi.login({ login: { email, password } });
    //   setToLocalStorage({
    //     authToken: response.data.authentication_token,
    //     email,
    //     userId: response.data.id,
    //     user_name: `${response.data.first_name} ${response.data.last_name}`,
    //   });
    //   setAuthHeaders();
    //   window.location.href = "/";
    // } catch (error) {
    //   logger.error(error);
    // }
  };
  if (loading) {
    return (
      <div className="mx-auto pt-48">
        <PageLoader />
      </div>
    );
  }

  if (!quizRecord) {
    // return(<Route path="/public/notfound" component={NotFound} />)
    history.push("/public/notfound");
    return <></>;
  }

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
