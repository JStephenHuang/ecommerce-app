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
  const removingListing = await Listing.findById(listingId);
  if (!removingListing) return res.status(400).json("ArticleNotFound");

  const cart = user.cart;
  const listings = cart.listings;

  // Removing article

  const removingItemIndex = listings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);

  removingListing.inCart.splice(
    removingListing.inCart.indexOf(Object(user._id)),
    1
  );

  listings.splice(removingItemIndex, 1);

  user.save();
  removingListing.save();
  return res.status(200).json(cart);
});

export { router };
