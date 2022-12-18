import mongoose, { Schema, Types } from "mongoose";
import { userSchema } from "./user";

const reviewSchema = new Schema({
  reviewer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  reviewee: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export { reviewSchema, Review };
