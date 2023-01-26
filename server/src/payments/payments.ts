import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middleware/is-authenticated";
import { isOnboarded } from "../middleware/is-onboarded";
import { User } from "../models/user";
import { IListing, Listing } from "../models/listing";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

router.post(
  "/",
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
      success_url: `${process.env.BACKEND_URL}/checkout/?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
      payment_intent_data: {},
    });

    return res.status(200).json({ url: session.url });
  }
);

// router.get("/success", async (req: Request, res: Response) => {
//   console.log(req.query.session_id);
//   const session = await stripe.checkout.sessions.retrieve(
//     req.query.session_id as string
//   );

//   console.log(session.line_items);
// });

router.get("/success", async (req: Request, res: Response) => {
  const cart = req.query.cart as any;
  for (const item of cart) {
    console.log(item._id);
    const listing = await Listing.findById(item._id);
    if (!listing)
      return res.status(400).redirect(`${process.env.CLIENT_URL}?cancel=true`);

    listing.update({ $set: { status: "sold" } });
  }
  return res.status(200).redirect(`${process.env.CLIENT_URL}?success=true`);
});

export { router };
