import axios from "axios";

const create = payload => axios.post("/users/", payload);

const list = () => axios.get("/users/");

const exportData = () => axios.get("/users/export/");

const usersApi = {
  create,
  list,
  exportData,
};

export default usersApi;
