import mongoose, { Schema } from "mongoose";
import { Article, ArticleType, articleSchema } from "./article";

type CartType = {
  articles: Array<any>;
  total: number;
};

const cartSchema = new Schema({
  articles: {
    type: [articleSchema],
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export { Cart, CartType, cartSchema };
