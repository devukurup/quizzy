import axios from "axios";

const create = payload => axios.post("/participants/", payload);

const show = ({ id }) => axios.get(`/participants/${id}`);

const participantsApi = {
  create,
  show,
};

export default participantsApi;
