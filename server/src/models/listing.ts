import mongoose, { Schema } from "mongoose";

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
  imageURL: {
    type: String,
  },
});

type listingType = typeof listingSchema;
const Listing = mongoose.model("Listing", listingSchema);

export { Listing, listingType, listingSchema };
