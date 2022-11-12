export interface ListingType {
  title: string;
  clothingType: string;
  seller: {
    _id: string;
    username: string;
  };
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

export interface ListListingType {
  title: string;
  clothingType: string;
  seller: string;
  description: string;
  size: string;
  condition: string;
  schoolName: string;
  price: number;
}

export interface FrontEndListing {
  title: string;
  school: {
    _id: string;
    name: string;
  };
  images: Array<File | undefined>;
  price: number;
  _id: string;
}

export const listingDefaultValue = {
  title: "-",
  clothingType: "-",
  seller: "-",
  description: "-",
  size: 0,
  condition: "-",
  school: "-",
  images: [],
  price: 0,
  _id: "-",
};
