import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API_URL } from "../../constants";

export default function useAxios() {
  const user = localStorage.getItem("user");
  const token: any = user ? JSON.parse(user).tokens.access : null;
  const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
      // add auth header if we have a token
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let msg = error.message;
      if (error.response && error.response.data && error.response.data.detail)
        msg += ": " + error.response.data.detail;
      toast.error(msg);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
