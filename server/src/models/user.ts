import mongoose, { Schema } from "mongoose";

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
      type: Array,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export { User };
