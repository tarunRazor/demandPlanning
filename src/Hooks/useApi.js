import { useContext } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";

const useApi = () => {
  const { accessToken } = useContext(AppContext);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_DEV_API_ROOT,
  });

  instance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

export default useApi;
