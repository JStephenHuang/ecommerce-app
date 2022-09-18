import { Router, Request, Response } from "express";
import { School } from "../models/school";
import { articleType } from "../models/article";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  School.find()
    .then((schools) => {
      return res.status(200).json(schools);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req: Request, res: Response) => {
  School.findById(req.params.id)
    .then((school) => {
      return res.status(200).json(school);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req: Request, res: Response) => {
  const name = req.body.name;
  const products: articleType[] = [];
  const newSchool = new School({ name, products });
  newSchool
    .save()
    .then((school) => res.status(200).json("SchoolAdded " + school))
    .catch((err) => res.status(404).json("Error: " + err));
});

export { router };
