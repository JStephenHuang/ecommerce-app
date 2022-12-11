import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  clothingType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  school: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "School",
    required: true,
  },
  inCart: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Cart",
  },
  price: {
    type: Number,
    required: true,
  },
});

type listingType = typeof listingSchema;
const Listing = mongoose.model("Listing", listingSchema);

export { Listing, listingType, listingSchema };
