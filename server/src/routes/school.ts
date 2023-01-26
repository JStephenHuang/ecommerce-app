import { Router, Request, Response } from "express";
import { School } from "../models/school";
import { IListing } from "../models/listing";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const schools = await School.find();
  if (!schools) return res.status(400).json("SchoolsNotFound");
  return res.status(200).json(schools);
});

router.get("/:id", async (req: Request, res: Response) => {
  const school = await School.findById(req.params.id);

  if (!school) return res.status(400).json("SchoolNotFound");
  return res.status(200).json(school);
});

router.post("/add", (req: Request, res: Response) => {
  const name = req.body.name;
  const newSchool = new School({ name });
  newSchool
    .save()
    .then((school) => res.status(200).json("SchoolAdded " + school))
    .catch((err) => res.status(404).json("Error: " + err));
});

export { router };
