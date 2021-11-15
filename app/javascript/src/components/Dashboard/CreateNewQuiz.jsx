import React from "react";

import { Typography, Button, Input, Label } from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import quizzesApi from "../../apis/quizzes";
import { useQuiz } from "../../contexts/quiz";

const CreateNewQuiz = () => {
  const history = useHistory();
  const { setNewQuiz } = useQuiz();
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
      setNewQuiz(false);
      history.push("/");
    } catch (error) {
      Logger.error(error);
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
              <Field name="quizName" type="text">
                {({ field, meta }) => (
                  <Input {...field} error={meta.touched && meta.error} />
                )}
              </Field>
            </div>
            <div className="flex space-x-5 ">
              <Button label="Submit" type="submit" />
              <Button
                label="Cancel"
                onClick={() => {
                  history.push("/");
                  setNewQuiz(false);
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
