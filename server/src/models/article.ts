import mongoose, { Schema } from "mongoose";
import { schoolSchema } from "./school";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  school: {
    type: schoolSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

type articleType = typeof articleSchema;

const Article = mongoose.model("Article", articleSchema);

export { Article, articleType, articleSchema };
