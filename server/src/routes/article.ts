import { Router, Request, Response } from "express";
import { Article } from "../models/article";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  Article.find()
    .then((articles) => {
      return res.status(200).json(articles);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/sell", (req: Request, res: Response) => {});
