import axios, { AxiosInstance } from "axios";
import React, { useContext } from "react";
import { ListingFormType } from "../types/listing";

class APIContextValue {
  axios: AxiosInstance;

  constructor(
    public readonly IP: string = process.env.REACT_APP_BACKEND_URI as string
  ) {
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

  getListingsByType = async (type: string) => {
    return await this.axios.get(`${this.IP}/listing/${type}`);
  };

  getUser = async (username: string) => {
    return await this.axios.get(`${this.IP}/user/${username}`);
  };

  getUserListings = async (username: string) => {
    return await this.axios.get(`${this.IP}/user/listings/${username}`);
  };

  createListing = async (body: ListingFormType) => {
    return await this.axios.post(`${this.IP}/listing/publish`, body);
  };
  getCartItems = async (username: string) => {
    const params = {
      username: username,
    };
    return await fetch(`${this.IP}/cart/${params.username}`);
  };
  addCartItem = async (username: string, id: string) => {
    const body = {
      username: username,
    };
    return await this.axios.post(`${this.IP}/listing/add-cart/${id}`, body);
  };
  removeCartItem = async (username: string, id: string) => {
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
