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
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  school: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "School",
  },
  inCart: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "User",
  },
  price: {
    type: Number,
  },
  dicks: {
    type: Number,
    required: true,
    default: 0,
  },
  imageURL: {
    type: String,
  },
});

type IListing = InferSchemaType<typeof listingSchema>;
const Listing = mongoose.model<IListing>("Listing", listingSchema);

export { Listing, listingSchema, IListing };
