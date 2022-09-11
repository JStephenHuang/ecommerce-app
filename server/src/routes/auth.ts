import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { Cart } from "../models/cart";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then((user) => {
    if (!user) return res.status(404).json({ error: "UserNotFound" });
    const passwordInDb = user.password;
    if (passwordInDb === password)
      return res.status(200).json("CorrectPassword");
    else return res.status(404).json({ error: "IncorrectPassword" });
  });
});

router.post("/register", (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const cart = new Cart();
  const newUser = new User({ username, password, cart });
  newUser
    .save()
    .then(() => res.status(200).json("UserAdded"))
    .catch((err) => res.status(404).send("Error: " + err));
});

export { router };
