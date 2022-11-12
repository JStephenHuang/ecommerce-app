import mongoose, { Schema } from "mongoose";
import { CartType, cartSchema } from "./cart";
import { listingSchema } from "./listing";
import { listingDraftSchema } from "./listing-draft";
import { reviewSchema } from "./review";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [reviewSchema],
    },
    sold: {
      type: [listingSchema],
    },
    cart: {
      type: cartSchema,
      required: true,
    },
    listings: {
      type: [listingSchema],
    },
    listingDrafts: {
      type: [listingDraftSchema],
    },
  },

  {
    timestamps: true,
  }
);

type userType = typeof userSchema;
const User = mongoose.model("User", userSchema);

export { User, userSchema, userType };
