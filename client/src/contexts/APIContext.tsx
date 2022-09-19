import axios, { AxiosInstance } from "axios";
import { stringify } from "querystring";

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

  getSchool = async (id: string) => {
    return await this.axios.get(`${this.IP}/school/${id}`);
  };
  getArticles = async () => {
    return await this.axios.get(`${this.IP}/article`);
  };

  getArticle = async (id: string) => {
    return await this.axios.get(`${this.IP}/article/${id}`);
  };
  sellProduct = async (
    title: string,
    productType: string,
    seller: string,
    description: string,
    size: string,
    school: string,
    price: number
  ) => {
    const body = {
      title: title,
      productType: productType,
      seller: seller,
      description: description,
      size: size,
      school: school,
      price: price,
    };
    await this.axios.post(`${this.IP}/article/sell`, body);
  };
  getCart = async (username: string) => {
    const params = {
      username: username,
    };
    return await this.axios.get(`${this.IP}/cart/${params.username}`);
  };
  addToCart = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    return await this.axios.post(`${this.IP}/article/add-cart/${id}`, body);
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
