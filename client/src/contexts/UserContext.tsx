import axios, { AxiosInstance } from "axios";

import React, { useContext } from "react";

class UserValue {
  axios: AxiosInstance;

  constructor(public buyer: string = "Stephen", public seller: string = "Leo") {
    this.axios = axios.create({
      withCredentials: true,
    });
  }
}

const defaultValue = new UserValue();
const UserContext = React.createContext<UserValue>(defaultValue);
const useUser = () => useContext(UserContext);
const UserProvider = (props: { children: React.ReactNode }) => {
  return (
    <UserContext.Provider value={defaultValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
