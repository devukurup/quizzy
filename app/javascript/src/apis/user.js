import axios from "axios";

const create = payload => axios.post("/users/", payload);

const list = () => axios.get("/users/");

const usersApi = {
  create,
  list,
};

export default usersApi;
