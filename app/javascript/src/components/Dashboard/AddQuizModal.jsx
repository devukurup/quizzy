import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Typography, Button, Input, Label } from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import Logger from "js-logger";
import * as Yup from "yup";

import quizzesApi from "../../apis/quizzes";

const AddQuizModal = ({ modal, setModal }) => {
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
      setModal(false);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <Modal isOpen={modal} onClose={() => setModal(false)}>
      <Modal.Header className="text-center pb-3">
        <Typography style="h2">Add new quiz</Typography>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Modal.Body>
            <div className="flex flex-row">
              <Label className="mr-5 justify-end">Quiz Name</Label>
              <Field name="quizName" type="text">
                {({ field, meta }) => (
                  <Input {...field} error={meta.touched && meta.error} />
                )}
              </Field>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button label="Submit" type="submit" />
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddQuizModal;
