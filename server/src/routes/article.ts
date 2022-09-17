import { Router, Request, Response } from "express";
import { Article } from "../models/article";
import { User, userType } from "../models/user";
import { School, schoolSchema } from "../models/school";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  Article.find()
    .then((articles) => {
      return res.status(200).json(articles);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req: Request, res: Response) => {
  Article.findOne({ _id: req.params.id })
    .then((article) => {
      return res.status(200).json(article);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/sell", (req: Request, res: Response) => {
  const { title, productType, seller, description, size, school, price } =
    req.body;
  const inCart: userType[] = [];
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
        inCart,
      });
      newArticle
        .save()
        .then((article) => {
          school.products.push(article);
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
      const cart = user.cart;
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
      if (article.seller !== user) return res.status(200).json("NoOwnership");
      article.delete();
      School.findOne({ name: article.school.name }).then((school) => {
        if (!school) return res.status(400).json("SchoolNotFound");
        const schoolProducts = school.products;
        schoolProducts.splice(schoolProducts.indexOf(article.school.name), 1);
        school.save();
      });
      res.status(200).json("ArticleRemoved");
    })

    .catch((err) => res.status(200).json("Error: " + err));
});

export { router };
