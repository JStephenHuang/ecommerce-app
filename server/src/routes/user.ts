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

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  const user = await User.findById(req.uid);
  if (!user) return res.status(400).json("UserNotFound");
  return res.status(200).json({ message: "UserExist", user: user });
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;

  const account = await stripe.accounts.create({
    type: "express",
    email: email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "individual",
  });

  const userForm = {
    _id: req.uid,
    stripe_id: account.id,
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
  };

  await User.create(userForm);

  res.redirect("http://localhost:3000/");
});

export { router };
