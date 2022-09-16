import { Router, Request, Response } from "express";
import { Article } from "../models/article";
import { CartType } from "../models/cart";
import { User } from "../models/user";

const router = Router();

router.get("/:username", (req: Request, res: Response) => {
  User.findOne({ username: req.params.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const cart: CartType = user.cart;
    return res.status(200).json(cart);
  });
});

router.post("/remove/:id", (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const articleId = req.params.id;
    Article.findById(articleId).then((article) => {
      if (!article) return res.status(400).json("ArticleNotFound");
      const cart: CartType = user.cart;
      const articles = cart.articles;
      if (
        !articles.some((articleInCart) => (articleInCart._id = article._id))
      ) {
        console.log(articles);
        console.log(article);
        return res.status(400).json("ArticleNotFound");
      }
      // Removing article
      const articleIndex = articles.findIndex((article) => {
        return article._id === articleId;
      });
      articles.splice(articleIndex, 1);
      console.log(articleIndex);

      cart.total -= article.price;
      user.save();
      return res.status(200).json(cart);
    });
  });
});

export { router };
