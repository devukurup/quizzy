import axios from "axios";

const list = () => axios.get("/quizzes");

const show = ({ id }) => axios.get(`/quizzes/${id}`);

const publish = ({ id }) => axios.put(`/quizzes/${id}/publish`);

const create = payload => axios.post("/quizzes/", payload);

const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);

const destroy = id => axios.delete(`/quizzes/${id}`);

const quizzesApi = {
  list,
  show,
  create,
  update,
  destroy,
  publish,
};

export default quizzesApi;
