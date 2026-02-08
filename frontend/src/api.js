import axios from "axios";

export const getMessage = () => {
  return axios.get("/api/message");
};
