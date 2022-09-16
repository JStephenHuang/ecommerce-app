import axios, { AxiosInstance } from "axios";

import React, { useContext } from "react";

class APIContextValue {
  axios: AxiosInstance;

  constructor(public readonly IP: string = `http://localhost:8000`) {
    this.axios = axios.create({
      withCredentials: true,
    });
  }
  getSchools = async () => {
    return await this.axios.get(`${this.IP}/school`);
  };
  getArticles = async () => {
    return await this.axios.get(`${this.IP}/article`);
  };
  getCart = async (username: string) => {
    const params = {
      username: username,
    };
    return await this.axios.get(`${this.IP}/cart/${params.username}`);
  };
  removeItem = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    await this.axios.post(`${this.IP}/cart/remove/${id}`, body);
  };
}

const defaultValue = new APIContextValue();
const APIContext = React.createContext<APIContextValue>(defaultValue);
const useAPIs = () => useContext(APIContext);
const APIProvider = (props: { children: React.ReactNode }) => {
  return (
    <APIContext.Provider value={defaultValue}>
      {props.children}
    </APIContext.Provider>
  );
};

export { APIContext, APIProvider, useAPIs };
