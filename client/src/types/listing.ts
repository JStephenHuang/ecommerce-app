import { UserType } from "./user";

export interface ListingType {
  title: string;
  clothingType: string;
  seller: UserType;
  size: number;
  school: {
    _id: string;
    name: string;
  };
  description: string;
  condition: string;
  images: Array<File | undefined>;
  price: number;
  inCart: [string];
  _id: string;
}

export interface ListingFormType {
  title: string;
  clothingType: string;
  seller: string;
  description: string;
  size: string;
  condition: string;
  schoolName: string;
  price: number;
}

export const listingFormDefaultValue = {
  title: "",
  clothingType: "",
  seller: "",
  description: "",
  size: "",
  condition: "",
  schoolName: "",
  price: 0.0,
};

export interface FrontEndListing {
  title: string;
  school: {
    _id: string;
    name: string;
  };
  seller: string;
  inCart: [string];
  price: number;
  _id: string;
}
