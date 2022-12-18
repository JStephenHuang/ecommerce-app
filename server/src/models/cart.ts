import mongoose, { Schema } from "mongoose";
import { listingSchema } from "./listing";

const cartSchema = new Schema({
  listings: {
    type: [listingSchema],
    default: [],
  },
});

type CartType = typeof cartSchema;

const Cart = mongoose.model("Cart", cartSchema);

export { Cart, CartType, cartSchema };
