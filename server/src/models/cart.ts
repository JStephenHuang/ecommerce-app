import mongoose, { Schema } from "mongoose";
import { articleSchema } from "./article";

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

type CartType = typeof cartSchema;

const Cart = mongoose.model("Cart", cartSchema);

export { Cart, CartType, cartSchema };
