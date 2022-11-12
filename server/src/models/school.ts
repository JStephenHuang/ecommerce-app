import mongoose, { Schema } from "mongoose";
import { listingSchema, listingType } from "./listing";

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: [listingSchema],
    required: true,
  },
});

type schoolType = typeof schoolSchema;

const School = mongoose.model("School", schoolSchema);

export { School, schoolSchema, schoolType };
