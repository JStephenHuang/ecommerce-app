import mongoose, { ObjectId, Schema } from "mongoose";
import { CartType, cartSchema } from "./cart";

type UserType = {
  username: string;
  password: string;
  cart: CartType;
};

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
const User = mongoose.model("User", userSchema);

export { User, UserType };
