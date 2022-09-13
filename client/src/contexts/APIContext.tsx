import axios, { AxiosInstance } from "axios";

import React, { ReactNode, useContext } from "react";

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
