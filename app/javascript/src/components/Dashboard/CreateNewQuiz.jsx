import React from "react";

import { Typography, Button, Input, Label } from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import Logger from "js-logger";
import * as Yup from "yup";

import quizzesApi from "../../apis/quizzes";
import { useQuiz } from "../../contexts/quiz";

const CreateNewQuiz = () => {
  const { setNewQuiz } = useQuiz();
  const validationSchema = () => {
    return Yup.object().shape({
      quizName: Yup.string().trim().required("Quiz Name is required"),
    });
  };

  const handleSubmit = data => {
    handleSubmitRequest(data);
  };

  const initialValues = {
    quizName: "",
  };

  const handleSubmitRequest = async data => {
    const quiz_name = data.quizName;
    try {
      await quizzesApi.create({ quiz: { quiz_name } });
      setNewQuiz(false);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="text-center pb-3">
      <Typography style="h2">Add new quiz</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-row">
            <Label className="mr-5 justify-end">Quiz Name</Label>
            <Field name="quizName" type="text">
              {({ field, meta }) => (
                <Input {...field} error={meta.touched && meta.error} />
              )}
            </Field>
          </div>
          <Button label="Submit" type="submit" />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateNewQuiz;
