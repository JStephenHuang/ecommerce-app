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
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    reviews: {
      type: [reviewSchema],
    },
    sells: {
      type: Number,
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
