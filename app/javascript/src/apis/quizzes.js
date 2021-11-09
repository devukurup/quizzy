import axios from "axios";

const list = () => axios.get("/quizzes");
// const list = () => 'devu';

const quizzesApi = {
  list,
};

export default quizzesApi;
