import mongoose, { Schema, InferSchemaType } from "mongoose";
import { cartSchema } from "./cart";
import { listingSchema } from "./listing";
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
      type: [listingSchema],
    },
  },

  {
    timestamps: true,
  }
);

type IUser = InferSchemaType<typeof userSchema>;
const User = mongoose.model<IUser>("User", userSchema);

export { User, userSchema, IUser };
