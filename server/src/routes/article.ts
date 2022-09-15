import { Router, Request, Response } from "express";
import { Article } from "../models/article";
import { User } from "../models/user";
import { School } from "../models/school";
import { CartType } from "../models/cart";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  Article.find()
    .then((articles) => {
      return res.status(200).json(articles);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/sell", (req: Request, res: Response) => {
  const { title, productType, seller, description, size, school, price } =
    req.body;
  School.findOne({ name: school })
    .then((school) => {
      if (!school) return res.status(200).json("SchoolNotFound");
      const newArticle = new Article({
        title,
        productType,
        seller,
        description,
        size,
        school,
        price,
      });
      newArticle
        .save()
        .then(() => {
          school.products += 1;
          school.save();
          res.status(200).json("ArticleInStore");
        })
        .catch((err) => res.status(404).send("Error: " + err));
    })
    .catch((err) => res.status(404).send("Error:" + err));
});

router.post("/add-cart/:id", (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const articleId = req.params.id;
    Article.findById(articleId).then((article) => {
      if (!article) return res.status(400).json("ArticeNotFound");
      const cart: CartType = user.cart;
      cart.articles.push(article);
      cart.total += article.price;
      user.save();
      return res.status(200).json(cart);
    });
  });
});

router.delete("/delete/:id", (req: Request, res: Response) => {
  const user = req.body.username;
  const articleId = req.params.id;
  Article.findById(articleId)
    .then((article) => {
      if (!article) return res.status(400).json("ArticleNotFound");
      if (article.seller !== user) res.status(200).json("NoOwnership");
      article.delete();
      res.status(200).json("ArticleRemoved");
    })

    .catch((err) => res.status(200).json("Error: " + err));
});

export { router };
