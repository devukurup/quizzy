import React, { useState } from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Typography, Button, Input, Label } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import quizzesApi from "../../apis/quizzes";

const AddQuizModal = ({ modal, setModal }) => {
  const [quizName, setQuizName] = useState("");

  const handleSubmit = async event => {
    const quiz_name = quizName;
    event.preventDefault();
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
      <Modal.Body>
        <div className="flex flex-row">
          <Label className="mr-5 justify-end">Quiz Name</Label>
          <Input value={quizName} onChange={e => setQuizName(e.target.value)} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button label="Submit" onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuizModal;
