import mongoose, { Schema } from "mongoose";
import { listingSchema } from "./listing";

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

type schoolType = typeof schoolSchema;

const School = mongoose.model("School", schoolSchema);

export { School, schoolSchema, schoolType };
