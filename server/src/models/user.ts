import mongoose, { Schema, InferSchemaType } from "mongoose";
import { IListing, listingSchema } from "./listing";
import { reviewSchema } from "./review";

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    stripe_id: {
      type: String,
      default: "",
    },
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
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: {
      type: [reviewSchema],
      required: true,
      default: [],
    },

    cart: {
      type: [String],
      required: true,
      default: [],
      ref: "Listing",
    },
  },

  {
    timestamps: true,
  }
);

type IUser = InferSchemaType<typeof userSchema>;
const User = mongoose.model<IUser>("User", userSchema);

export { User, userSchema, IUser };
