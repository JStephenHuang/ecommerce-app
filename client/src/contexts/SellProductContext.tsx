import axios, { AxiosInstance } from "axios";

import React, { useContext } from "react";

class SellProductValue {
  axios: AxiosInstance;

  constructor(
    public productInfo: {
      title: string;
      productType: string;
      seller: string;
      description: string;
      size: string;
      school: string;
      price: number;
    } = {
      title: "-",
      productType: "-",
      seller: "-",
      description: "-",
      size: "-",
      school: "-",
      price: 0,
    }
  ) {
    this.axios = axios.create({
      withCredentials: true,
    });
  }

  fillInformation = (
    school: string,

    productType: string,
    size: string,
    title: string
  ) => {
    this.productInfo.title = title;
    this.productInfo.school = school;
    this.productInfo.productType = productType;
    this.productInfo.size = size;
  };
  fillDetail = (seller: string, price: number, description: string) => {
    this.productInfo.seller = seller;
    this.productInfo.price = price;
    this.productInfo.description = description;
  };
}

const defaultValue = new SellProductValue();
const SellProductContext = React.createContext<SellProductValue>(defaultValue);
const useSellProduct = () => useContext(SellProductContext);
const SellProductProvider = (props: { children: React.ReactNode }) => {
  return (
    <SellProductContext.Provider value={defaultValue}>
      {props.children}
    </SellProductContext.Provider>
  );
};

export { useSellProduct, SellProductProvider };
