import { Router, Request, Response } from "express";
import { User } from "../models/user";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:username", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(400).json("UserNotFound");
  return res.status(200).json(user);
});

router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.findById(req.params._id);
  if (!user) return res.status(400).json("UserNotFound");
  return res.status(200).json(user);
});

router.get("/listings/:username", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(400).json("UserNotFound");
  return res.status(200).json(user.listings);
});

export { router };
