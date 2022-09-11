import mongoose, { Schema } from "mongoose";
import { Article, ArticleType, articleSchema } from "./article";

type CartType = {
  articles: Array<any>;
  price: number;
};

const cartSchema = new Schema({
  articles: {
    type: [articleSchema],
    default: [],
  },
  price: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export { Cart, CartType, cartSchema };
