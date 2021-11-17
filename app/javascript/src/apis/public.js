import axios from "axios";

const show = ({ slug }) => axios.get(`/public_quiz/${slug}`);

// const create = payload => axios.post("/quizzes/", payload);

// const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);

// const destroy = id => axios.delete(`/quizzes/${id}`);

const publicQuizApi = {
  show,
};

export default publicQuizApi;
