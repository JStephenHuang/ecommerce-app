import axios, { AxiosRequestConfig } from "axios";
import { useFirebaseAuthToken } from "../contexts/firebase-app-context";

export const useAPIClient = () => {
  const config: AxiosRequestConfig = {};
  config.baseURL = process.env.REACT_APP_BACKEND_URL;
  config.withCredentials = true;

  const token = useFirebaseAuthToken();

  if (token !== null) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.create(config);
};
