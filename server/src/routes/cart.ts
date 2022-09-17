import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import { Article } from "../models/article";
import { User } from "../models/user";

const router = Router();

router.get("/:username", (req: Request, res: Response) => {
  User.findOne({ username: req.params.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const cart = user.cart;
    return res.status(200).json(cart);
  });
});

router.post("/remove/:id", (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const articleId: Types.ObjectId = Object(req.params.id);
    Article.findById(articleId).then((article) => {
      if (!article) return res.status(400).json("ArticleNotFound");
      const cart = user.cart;
      const articles = cart.articles;

      // Removing article
      const articleIndex = articles
        .map((article) => article._id)
        .indexOf(articleId);
      articles.splice(articleIndex, 1);

      cart.total -= article.price;
      user.save();
      return res.status(200).json(cart);
    });
  });
});

export { router };
