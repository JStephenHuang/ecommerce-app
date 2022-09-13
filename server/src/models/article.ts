import mongoose, { Schema } from "mongoose";
import { schoolSchema } from "./school";

type ArticleType = {
  title: string;
  seller: string;
  description: string;
  size: number;
  school: string;
  price: number;
};

const articleSchema = new Schema({
  title: {
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
    type: Number,
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

const Article = mongoose.model("Article", articleSchema);

export { Article, ArticleType, articleSchema };
