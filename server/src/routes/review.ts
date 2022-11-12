import { Router, Request, Response } from "express";
import { Review } from "../models/review";

const router = Router();

router.post("/write", async (req: Request, res: Response) => {
  const content = req.body.content;
  const writer = req.body.user;
  const destinator = req.body.destinator;
  if (!destinator) return res.status(400).json("DestinatorNotFound");
  const review = await new Review({ content, writer, destinator });
  review
    .save()
    .then((review) => res.status(200).json("ReviewWrote" + review))
    .catch((err) => res.status(400).json("Error: " + err));
});

export { router };
