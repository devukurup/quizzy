import React from "react";

import { Typography, Button, Label } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import quizzesApi from "../../apis/quizzes";

const CreateNewQuiz = () => {
  const history = useHistory();
  const validationSchema = () => {
    return Yup.object().shape({
      quizName: Yup.string().trim().required("Quiz Name is required"),
    });
  };

  const initialValues = {
    quizName: "",
  };

  const handleSubmit = async data => {
    const quiz_name = data.quizName;
    try {
      await quizzesApi.create({ quiz: { quiz_name } });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-5 mx-auto w-6/12 bg-gray-300 p-24 mt-24">
        <Typography style="h2">Add new quiz</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center space-y-5">
            <div className="flex flex-row">
              <Label className="mr-5 justify-end">Quiz Name</Label>
              <Input name="quizName" type="text" />
            </div>
            <div className="flex space-x-5 ">
              <Button label="Submit" type="submit" />
              <Button
                label="Cancel"
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateNewQuiz;
