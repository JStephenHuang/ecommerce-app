import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middleware/is-authenticated";
import { isOnboarded } from "../middleware/is-onboarded";
import { User } from "../models/user";
import { IListing, Listing } from "../models/listing";
// import { IListing, Listing } from "../models/listing";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

router.get("/order", async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;
  if (!sessionId) return res.status(400).send("InvalidSessionID");

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
  console.log(session.line_items, session.status);

  if (session.status === "complete") {
    const line_items = session.line_items;

    if (!line_items) return res.status(400).json("LineItemsNull");

    line_items.data.forEach(async (item) => {
      const listing = await Listing.findOne({
        title: item.description,
      });

      console.log(listing);

      if (!listing) return res.status(400).json("ListingNotFound");

      await listing.update({ $set: { status: "sold" } });
    });
  }

  return res.status(200).json(session);
});

router.post(
  "/checkout",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid).populate<{ cart: IListing[] }>(
      "cart"
    );
    if (!user) return res.status(400).json("UserNotFound");

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      user.cart.map((item) => {
        return {
          price_data: {
            currency: "CAD",
            product_data: {
              name: item.title as string,
              description: item.description as string,
              images: [
                "https://www.blacksquare.io/wp-content/uploads/2021/03/black-square.jpg",
              ],
            },
            unit_amount: (item.price as number) * 100,
          },
          quantity: 1,
        };
      });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
      payment_intent_data: {},
    });

    return res.status(200).json({ url: session.url });
  }
);

router.post(
  "/connect",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid);
    if (!user) return res.status(400).json("UserNotFound");

    const account = await stripe.accounts.create({
      type: "express",
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      email: user.email,
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.CLIENT_URL}/`,
      return_url: `${process.env.CLIENT_URL}/`,
      type: "account_onboarding",
    });

    return res.status(200).json({ url: accountLink.url });
  }
);

export { router };
