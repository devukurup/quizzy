import axios from "axios";

const create = payload => axios.post("/questions/", payload);

const list = ({ id }) => axios.get(`/questions/`, { params: { id } });

const destroy = id => axios.delete(`/questions/${id}`);

const questionsApi = {
  create,
  list,
  destroy,
};

export default questionsApi;
