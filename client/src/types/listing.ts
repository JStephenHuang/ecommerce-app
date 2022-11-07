export interface Listing {
  title: string;
  clothingType: string;
  seller: string;
  size: number;
  school: any;
  description: string;
  pictures: string[];
  price: number;
  _id: string;
}

export const listingDefaultValue = {
  title: "-",
  clothingType: "-",
  seller: "-",
  description: "-",
  size: 0,
  school: "-",
  pictures: [],
  price: 0,
  _id: "-",
};
