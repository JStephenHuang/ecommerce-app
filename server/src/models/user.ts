import mongoose, { Schema } from "mongoose";
import { CartType, cartSchema } from "./cart";

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
    cart: {
      type: cartSchema,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

type userType = typeof userSchema;

const User = mongoose.model("User", userSchema);

export { User, userSchema, userType };
