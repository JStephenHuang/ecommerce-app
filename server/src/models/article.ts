import mongoose, { Schema } from "mongoose";
import { CreateOptions } from "ts-node";

const articleSchema = new Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  school: {
    type: String,
  },
});

const Article = mongoose.model("Article", articleSchema);

export { Article };
