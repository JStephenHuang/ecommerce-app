import mongoose, { Schema } from "mongoose";
import { articleSchema, articleType } from "./article";

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
});

type schoolType = typeof schoolSchema;

const School = mongoose.model("School", schoolSchema);

export { School, schoolSchema, schoolType };
