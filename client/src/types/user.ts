import { IListing } from "./listing";

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  rating: number;
  reviews: Array<string>;
  cart: Array<IListing>;
  sold: Array<IListing>;
  listings: Array<IListing>;
  listingDrafts: Array<IListing>;
}

export const userAlt = {
  _id: "",
  firstname: "",
  lastname: "",
  username: "",
  rating: 0,
  reviews: [],
  cart: [],
  sold: [],
  listings: [],
  listingDrafts: [],
};
