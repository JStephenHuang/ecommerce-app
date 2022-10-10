import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { Listing } from "../models/listing";
import { User } from "../models/user";

const router = Router();

router.get("/:username", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(400).json("UserNotFound");
  const cart = user.cart;
  return res.status(200).json(cart);
});

router.post("/remove/:id", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");
  const listingId = req.params.id;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(400).json("ArticleNotFound");
  const cart = user.cart;
  const listings = cart.listings;

  // Removing article

  const listingIndex = listings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);

  listings.splice(listingIndex, 1);

  cart.total -= listing.price;
  user.save();
  return res.status(200).json(cart);
});

export { router };
