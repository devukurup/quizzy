import React from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Button, Label, Dropdown } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Field, Form } from "formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import questionsApi from "../../apis/questions";
import { useQuestion } from "../../contexts/question";

const CreateQuestion = ({
  defaultAnswer,
  setDefaultAnswer,
  count,
  setCount,
  disableAddOption,
  setDisableAddOption,
  optionsList,
  setOptionsList,
  id,
  initialValues,
  type,
  quiz_id,
}) => {
  const history = useHistory();
  const { quizRecord } = useQuestion();

  const validationSchema = () => {
    return Yup.object().shape({
      question: Yup.string().trim().required("Required"),
      option1: Yup.string().trim().required("Required"),
      option2: Yup.string().trim().required("Required"),
    });
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

  const handleSubmit = async data => {
    const questn = data.question;
    const option1 = data.option1;
    const option2 = data.option2;
    const option3 = data.option3;
    const option4 = data.option4;
    const answer = defaultAnswer;
    try {
      if (type === "Submit") {
        await questionsApi.create({
          question: {
            questn,
            option1,
            option2,
            option3,
            option4,
            answer,
            quiz_id: id,
          },
        });
        history.push(`/showQuiz/${id}`);
      } else {
        await questionsApi.update({
          id,
          payload: {
            question: {
              questn,
              option1,
              option2,
              option3,
              option4,
              answer,
              quiz_id,
            },
          },
        });
        history.push(`/showQuiz/${quiz_id}`);
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div>
      <div className="p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {quizRecord.quiz_name}
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
              <Input name="question" type="text" />
            </div>
            {optionsList.map((item, index) => (
              <div key={index} className="grid grid-cols-3">
                <Label>{`Options ${index + 1}`}</Label>
                {index < 2 && (
                  <div className="flex col-span-2 space-x-2">
                    <Input name={`option${item.id}`} type="text" />
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
              <Button className="col-end-3 " label={type} type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuestion;
