import axios from "axios";

const show = ({ slug }) => axios.get(`/public_quizzes/${slug}`);

const publicQuizApi = {
  show,
};

export default publicQuizApi;
