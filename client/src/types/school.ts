import { IListing } from "./listing";

export interface ISchool {
  _id: string;
  name: string;
  listings: Array<IListing>;
}
