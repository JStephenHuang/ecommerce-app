import { IListing } from "./listing";

export interface IUser {
  _id: string;
  stripe_id: string;
  firstname: string;
  lastname: string;
  username: string;
  rating: number;
  reviews: Array<string>;
  cart: Array<IListing>;
  sold: Array<IListing>;
}
