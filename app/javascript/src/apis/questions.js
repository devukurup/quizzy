import axios from "axios";

const create = payload => axios.post("/questions/", payload);

const list = ({ id }) => axios.get(`/questions/`, { params: { id } });

const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);

const destroy = id => axios.delete(`/questions/${id}`);

const questionsApi = {
  create,
  list,
  update,
  destroy,
};

export default questionsApi;
