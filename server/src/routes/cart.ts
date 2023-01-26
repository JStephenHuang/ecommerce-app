import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { User } from "../models/user";
import { isAuthenticated } from "../middleware/is-authenticated";
import { isOnboarded } from "../middleware/is-onboarded";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid).populate({
      path: "cart",
      populate: "seller",
    });
    if (!user) return res.status(400).json("UserNotFound");

    const cart = user.cart;
    return res.status(200).json(cart);
  }
);

router.post(
  "/remove/:id",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid);
    if (!user) return res.status(400).json("UserNotFound");

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(400).json("ListingNotFound");

    const cartItems = user.cart;

    // Removing article

    listing.inCart.splice(listing.inCart.indexOf(user._id), 1);
    cartItems.splice(cartItems.indexOf(listing._id.toHexString()), 1);

    user.save();
    listing.save();
    return res.status(200).json(cartItems);
  }
);

export { router };
