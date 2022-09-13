import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: Number,
    required: true,
  },
});

const School = mongoose.model("School", schoolSchema);

export { School, schoolSchema };
