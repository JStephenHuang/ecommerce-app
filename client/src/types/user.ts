import { ListingType } from "./listing";

export interface UserType {
  username: string;
  listing: Array<ListingType>;
  rating: number;
}
