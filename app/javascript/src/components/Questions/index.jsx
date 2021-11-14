import React, { useState } from "react";

import {
  Typography,
  Button,
  Label,
  Input,
  Dropdown,
} from "@bigbinary/neetoui/v2";
import { useLocation } from "react-router-dom";

const AddQuestion = () => {
  const { state } = useLocation();
  const [count, setCount] = useState(1);
  const [optionsList, setOptionsList] = useState([
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
  ]);
  const [disableAddOption, setDisableAddOption] = useState(false);

  const handleOptions = () => {
    setCount(prevState => prevState + 1);
    const newOptionList = [...optionsList, { id: count + 2, value: "Options" }];
    setOptionsList(newOptionList);
    if (count == 2) {
      setDisableAddOption(true);
    }
  };
  const handleOptionsDelete = index => {
    const newOptionsList = [...optionsList];
    newOptionsList.splice(index, 1);
    setOptionsList(newOptionsList);
    setDisableAddOption(false);
    setCount(prevState => prevState - 1);
  };

  return (
    <div>
      <div className="p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state}
        </Typography>
      </div>
      <div className="w-5/12 space-y-5 p-10">
        <div className="grid grid-cols-2">
          <Label>Question</Label>
          <Input />
        </div>
        {optionsList.map((item, index) => (
          <div key={index} className="grid grid-cols-2">
            <Label>{`Options ${index + 1}`}</Label>
            {index < 2 && <Input placeholder={item.value} />}
            {index >= 2 && (
              <div className="flex space-x-2">
                <Input placeholder={item.value} />
                <Button
                  label="Delete"
                  onClick={() => handleOptionsDelete(index)}
                />
              </div>
            )}
          </div>
        ))}
        <div className="grid grid-cols-2">
          {!disableAddOption && (
            <Button
              className="col-end-3"
              label="+ Add Option"
              onClick={handleOptions}
            />
          )}
        </div>
        <div className="grid grid-cols-2">
          <Label>Correct answer</Label>
          <Dropdown
            // buttonProps={{
            //   onClick: function noRefCheck(){}
            // }}
            buttonStyle="primary"
            label="Primary Dropdown"
            // onClose={function noRefCheck(){}}
            position="bottom-end"
          >
            {optionsList.map((item, index) => (
              <li key={index}>{`Options ${index + 1}`}</li>
            ))}
          </Dropdown>
        </div>
        <div className="grid grid-cols-2">
          <Button className="col-end-3 " label="Submit" type="submit" />
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
