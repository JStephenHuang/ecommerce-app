import mongoose, { Schema } from "mongoose";
import { CartType, cartSchema } from "./cart";
import { listingSchema } from "./listing";
import { reviewSchema } from "./review";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
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
      type: [listingSchema],
    },
  },

  {
    timestamps: true,
  }
);

type userType = typeof userSchema;
const User = mongoose.model("User", userSchema);

export { User, userSchema, userType };
