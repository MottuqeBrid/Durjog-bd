import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const reqId = axiosSecure.interceptors.request.use((config) => {
      const token = user?.accessToken || localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${
          localStorage.getItem("Authorization") || token
        }`;
      }
      return config;
    });

    // RESPONSE
    const resId = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const code = error.response?.status; 
        if (code === 401 || code === 403) {
          console.log(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqId);
      axiosSecure.interceptors.response.eject(resId);
    };
  }, [user, logout]);

  return axiosSecure;
};

export default useAxiosSecure;
