import mongoose, { Schema, InferSchemaType } from "mongoose";

const listingSchema = new Schema({
  title: {
    type: String,
  },
  clothingType: {
    type: String,
  },
  description: {
    type: String,
  },
  size: {
    type: String,
  },
  condition: {
    type: String,
  },
  likes: {
    type: [String],
    ref: "User",
    default: [],
  },
  seller: {
    type: String,
    ref: "User",
  },
  school: {
    type: String,
  },
  inCart: {
    type: [String],
    ref: "User",
    default: [],
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  imagePaths: {
    type: [String],
  },
});

type IListing = InferSchemaType<typeof listingSchema>;
const Listing = mongoose.model<IListing>("Listing", listingSchema);

export { Listing, listingSchema, IListing };
