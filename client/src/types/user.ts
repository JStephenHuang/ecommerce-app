import { ListingType } from "./listing";

export interface UserType {
  _id: string;
  username: string;
  listings: Array<ListingType>;
  rating: number;
  sold: Array<ListingType>;
}
