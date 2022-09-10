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

export { router };
