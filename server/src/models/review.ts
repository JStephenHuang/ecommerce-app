import mongoose, { Schema, Types } from "mongoose";
import { userSchema } from "./user";

const reviewSchema = new Schema({
  writer: {
    type: String,
  },
  id: {
    type: String,
  },
  content: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export { reviewSchema, Review };
