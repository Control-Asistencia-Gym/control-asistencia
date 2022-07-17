import axios from "axios";

const usersApi = axios.create({
  baseURL: "/api",
});

export default usersApi;
