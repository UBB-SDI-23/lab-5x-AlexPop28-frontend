import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export default function useAxios() {
  const user = localStorage.getItem("user");
  const token: any = user ? JSON.parse(user).access : null;
  return axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
      // add auth header if we have a token
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}
