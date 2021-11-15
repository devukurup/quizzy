import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import questionsApi from "../../apis/questions";
import { useQuestion } from "../../contexts/question";

const DeleteQuestion = () => {
  const { deleteQuestion, setDeleteQuestion, questionName, deleteId } =
    useQuestion();
  const handleDelete = async () => {
    const id = deleteId;
    try {
      await questionsApi.destroy(id);
      setDeleteQuestion(false);
    } catch (error) {
      Logger.error(error);
    }
  };
  return (
    <div>
      <Modal isOpen={deleteQuestion} onClose={() => setDeleteQuestion(false)}>
        <Modal.Header>
          <Typography style="h4">Deletion Alert</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2">
            Are you sure you want to delete the question{" "}
            <span className="font-bold">"{questionName}"</span> ?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-3">
          <Button label="Continue" onClick={handleDelete} />
          <Button label="Cancel" onClick={() => setDeleteQuestion(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteQuestion;
