import React from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Modal } from "@bigbinary/neetoui/v2";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import questionsApi from "apis/questions";
import { useQuestion } from "contexts/question";

const DeleteQuestion = () => {
  const { deleteQuestion, setDeleteQuestion, questionName, deleteId } =
    useQuestion();
  const handleDelete = async () => {
    const id = deleteId;
    try {
      await questionsApi.destroy(id);
      setDeleteQuestion(false);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Modal isOpen={deleteQuestion} onClose={() => setDeleteQuestion(false)}>
        <Modal.Header>
          <div className="flex flex-col space-y-3">
            <Warning color="#f56a58" size={30} />
            <Typography style="h4">Deletion Alert</Typography>
          </div>
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
