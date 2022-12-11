import { Router, Request, Response } from "express";
import { Review } from "../models/review";
import { User } from "../models/user";

const router = Router();

router.post("/write", async (req: Request, res: Response) => {
  const content = req.body.content;
  const reviewer = User.findById(req.body.userId);
  const reviewee = await User.findById(req.body.revieweeId);
  if (!reviewee) return res.status(400).json("DestinatorNotFound");
  const review = await new Review({ content, reviewer, reviewee });
  review
    .save()
    .then((review) => res.status(200).json("ReviewWrote" + review))
    .catch((err) => res.status(400).json("Error: " + err));
});

export { router };
