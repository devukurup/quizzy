import axios from "axios";

const update = ({ id, payload }) => axios.put(`/participants/${id}`, payload);

const show = ({ id }) => axios.get(`/participants/${id}`);

const participantsApi = {
  update,
  show,
};

export default participantsApi;
