import React, { useState } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import {
  Typography,
  Button,
  Label,
  Input,
  Dropdown,
} from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import Logger from "js-logger";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";

import questionsApi from "../../apis/questions";

const AddQuestion = () => {
  const history = useHistory();
  const { id } = useParams();
  const { state } = useLocation();
  const [count, setCount] = useState(1);
  const [defaultAnswer, setDefaultAnswer] = useState(1);
  const [optionsList, setOptionsList] = useState([
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
  ]);
  const [disableAddOption, setDisableAddOption] = useState(false);
  const validationSchema = () => {
    return Yup.object().shape({
      question: Yup.string().trim().required("Required"),
      option1: Yup.string().trim().required("Required"),
      option2: Yup.string().trim().required("Required"),
    });
  };

  const handleSubmit = async data => {
    const questn = data.question;
    const option1 = data.option1;
    const option2 = data.option2;
    const option3 = data.option3;
    const option4 = data.option4;
    const answer = defaultAnswer;
    const quiz_id = id;
    try {
      await questionsApi.create({
        question: {
          questn,
          option1,
          option2,
          option3,
          option4,
          answer,
          quiz_id,
        },
      });
      history.push({
        pathname: `/showQuiz/${id}`,
        state: state,
      });
    } catch (error) {
      Logger.error(error);
    }
  };

  const initialValues = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  };

  const handleOptions = () => {
    setCount(prevState => prevState + 1);
    const newOptionList = [...optionsList, { id: count + 2, value: "Options" }];
    setOptionsList(newOptionList);
    if (count == 2) {
      setDisableAddOption(true);
    }
  };
  const handleOptionsDelete = index => {
    if (defaultAnswer === index + 1) {
      setDefaultAnswer(1);
    }
    const newOptionsList = [...optionsList];
    newOptionsList.splice(index, 1);
    if (newOptionsList.length > 2) {
      newOptionsList[2].id = 3;
    }
    setOptionsList(newOptionsList);
    setDisableAddOption(false);
    setCount(prevState => prevState - 1);
  };

  return (
    <div>
      <div className="p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state.quiz_name}
        </Typography>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-4/12 space-y-5 p-10">
            <div className="grid grid-cols-3">
              <Label>Question</Label>
              <Field name="question" type="text">
                {({ field, meta }) => (
                  <Input
                    {...field}
                    error={meta.touched && meta.error}
                    className="col-span-2"
                  />
                )}
              </Field>
            </div>
            {optionsList.map((item, index) => (
              <div key={index} className="grid grid-cols-3">
                <Label>{`Options ${index + 1}`}</Label>
                {index < 2 && (
                  <div className="flex col-span-2 space-x-2">
                    <Field name={`option${item.id}`} type="text">
                      {({ field, meta }) => (
                        <Input
                          {...field}
                          error={meta.touched && meta.error}
                          placeholder={item.value}
                        />
                      )}
                    </Field>
                    {defaultAnswer === index + 1 && (
                      <CheckCircle color="#00ba88" size={30} />
                    )}
                  </div>
                )}
                {index >= 2 && (
                  <div className="flex col-span-2 space-x-2 ">
                    <Field name={`option${item.id}`} type="text">
                      {({ field }) => (
                        <div>
                          <Input {...field} placeholder={item.value} />
                          <Button
                            label="Delete"
                            onClick={() => {
                              if (item.id == 4) {
                                setFieldValue("option4", "");
                              } else {
                                setFieldValue("option3", values.option4);
                                setFieldValue("option4", "");
                              }
                              handleOptionsDelete(index);
                            }}
                          />
                        </div>
                      )}
                    </Field>

                    {defaultAnswer === index + 1 && (
                      <CheckCircle color="#00ba88" size={30} />
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="grid grid-cols-3">
              {!disableAddOption && (
                <Button
                  className="col-end-3"
                  label="+ Add Option"
                  onClick={handleOptions}
                />
              )}
            </div>
            <div className="grid grid-cols-3">
              <Label>Correct answer</Label>
              <Dropdown
                buttonStyle="primary"
                label={`Option ${defaultAnswer}`}
                position="bottom-end"
              >
                {optionsList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setDefaultAnswer(index + 1)}
                  >{`Options ${index + 1}`}</li>
                ))}
              </Dropdown>
            </div>
            <div className="grid grid-cols-3">
              <Button className="col-end-3 " label="Submit" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddQuestion;
