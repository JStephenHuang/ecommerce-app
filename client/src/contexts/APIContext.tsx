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

  getSchool = async (id: string) => {
    return await this.axios.get(`${this.IP}/school/${id}`);
  };
  getListings = async () => {
    return await this.axios.get(`${this.IP}/listing`);
  };

  getListing = async (id: string) => {
    return await this.axios.get(`${this.IP}/listing/${id}`);
  };

  getUser = async (username: string) => {
    return await this.axios.get(`${this.IP}/user/${username}`);
  };

  getUserListings = async (username: string) => {
    return await this.axios.get(`${this.IP}/user/listings/${username}`);
  };

  sellListing = async (
    title: string,
    productType: string,
    sellerName: string,
    description: string,
    size: string,
    schoolName: string,
    price: number
  ) => {
    const body = {
      title: title,
      productType: productType,
      sellerName: sellerName,
      description: description,
      size: size,
      schoolName: schoolName,
      price: price,
    };
    await this.axios.post(`${this.IP}/listing/sell`, body);
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
    return await this.axios.post(`${this.IP}/listing/add-cart/${id}`, body);
  };
  removeListing = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    await this.axios.post(`${this.IP}/cart/remove/${id}`, body);
  };
  deleteListing = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    await this.axios.post(`${this.IP}/listing/delete/${id}`, body);
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
