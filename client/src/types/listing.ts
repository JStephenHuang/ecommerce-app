export interface Listing {
  title: string;
  productType: string;
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
  productType: "-",
  seller: "-",
  description: "-",
  size: 0,
  school: "-",
  price: 0,
  _id: "-",
};
