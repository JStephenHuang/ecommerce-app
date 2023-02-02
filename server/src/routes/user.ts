import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { isAuthenticated } from "../middleware/is-authenticated";
import { isOnboarded } from "../middleware/is-onboarded";
import { Listing } from "../models/listing";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get(
  "/listings",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const activeListings = await Listing.find({
      seller: req.uid,
      status: "active",
    }).populate({ path: "seller" });

    return res.status(200).json(activeListings);
  }
);

router.get(
  "/drafts",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const drafts = await Listing.find({
      seller: req.uid,
      status: "draft",
    }).populate({ path: "seller" });
    return res.status(200).json(drafts);
  }
);

router.get(
  "/current",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid);
    if (!user) return res.status(400).json("UserNotFound");

    return res.status(200).json(user);
  }
);

router.get(
  "/:username",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json("UserNotFound");

    return res.status(200).json(user);
  }
);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2022-11-15",
// });

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;

  const user = await User.findOne({ username });
  if (user) return res.status(400).send("UserError: username taken.");

  const userForm = {
    _id: req.uid,
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
  };

  const createdUser = await User.create(userForm).catch((err) =>
    console.log(err.message)
  );
  return res.status(200).json(createdUser);
});

export { router };
