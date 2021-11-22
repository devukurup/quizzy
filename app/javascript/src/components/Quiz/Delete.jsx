import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Typography, Button } from "@bigbinary/neetoui/v2";

import quizzesApi from "../../apis/quizzes";
import { useQuiz } from "../../contexts/quiz";

const DeleteQuiz = ({ quizName }) => {
  const { deleteQuiz, setDeleteQuiz, deleteId } = useQuiz();

  const handleDelete = async () => {
    const id = deleteId;
    try {
      await quizzesApi.destroy(id);
      setDeleteQuiz(false);
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div>
      <Modal isOpen={deleteQuiz} onClose={() => setDeleteQuiz(false)}>
        <Modal.Header>
          <Typography style="h4">Deletion Alert</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{quizName}</span> ?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-3">
          <Button label="Continue" onClick={handleDelete} />
          <Button label="Cancel" onClick={() => setDeleteQuiz(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteQuiz;
