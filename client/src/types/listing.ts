import { StorageReference } from "firebase/storage";
import { IUser } from "./user";

export interface IListing {
  title: string;
  clothingType: string;
  seller: IUser;
  size: number;
  school: string;
  description: string;
  condition: string;
  price: number;
  inCart: string[];
  imagePaths: string[];
  _id: string;
}

export interface IListingForm {
  title?: string;
  clothingType?: string;
  description?: string;
  size?: string;
  condition?: string;
  schoolName?: string;
  price?: number;
  status?: string;
  imagePaths?: string[];
}

export const ListingFormDefault = {
  title: "",
  clothingType: "",
  description: "",
  size: "",
  condition: "",
  schoolName: "",
  price: 0,
  status: "",
  imagePaths: [],
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
