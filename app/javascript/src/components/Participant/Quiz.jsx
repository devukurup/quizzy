import React, { useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";

import { useQuestion } from "../../contexts/question";

const Quiz = () => {
  const { quizRecord, questionList } = useQuestion();
  const [answers, setAnswers] = useState([]);

  const handleChange = (e, item) => {
    const index = answers.findIndex(element => element.id == item.id);
    if (index < 0) {
      setAnswers(prev => [...prev, { id: item.id, answer: e.target.value }]);
    } else {
      answers[index].answer = e.target.value;
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col ">
      <div className="mt-10 p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {quizRecord.quiz_name}
        </Typography>
      </div>
      {questionList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-10 m-10 bg-blue-100 space-y-5"
        >
          <Typography style="body2" weight="bold">
            {item.questn}
          </Typography>
          <div className="flex space-x-4">
            <input
              type="radio"
              value="1"
              id={item.option1}
              onChange={e => handleChange(e, item)}
              name={index}
            />
            <label>{item.option1}</label>
          </div>
          <div className="flex space-x-4">
            <input
              type="radio"
              value="2"
              id={item.option2}
              onChange={e => handleChange(e, item)}
              name={index}
            />
            <label>{item.option2}</label>
          </div>
          {item.option3 && (
            <div className="flex space-x-4">
              <input
                type="radio"
                value="3"
                id={item.option3}
                onChange={e => handleChange(e, item)}
                name={index}
              />
              <label>{item.option3}</label>
            </div>
          )}
          {item.option4 && (
            <div className="flex space-x-4">
              <input
                type="radio"
                value="4"
                id={item.option4}
                onChange={e => handleChange(e, item)}
                name={index}
              />
              <label>{item.option4}</label>
            </div>
          )}
        </div>
      ))}
      <Button
        className=" mx-auto p-24 content-center mb-10 w-24 "
        label="Submit"
        type="submit"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Quiz;
