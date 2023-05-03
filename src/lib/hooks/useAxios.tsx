import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_API_URL } from "../../constants";

export default function useAxios() {
  const user = localStorage.getItem("user");
  const token: any = user ? JSON.parse(user).access : null;
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
      toast.error(error.message);
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
