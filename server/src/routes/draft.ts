import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { School } from "../models/school";
import { User } from "../models/user";
import { isAuthenticated } from "../middleware/is-authenticated";
import { getStorage } from "firebase-admin/storage";

import admin from "firebase-admin";
const router = Router();

router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const {
    title,
    clothingType,
    description,
    size,
    condition,
    schoolName,
    price,
    imagePaths,
  } = req.body;

  console.log(schoolName);

  const user = await User.findById(req.uid);
  if (!user) return res.status(400).json("SellerNotFound");

  if (schoolName !== "") {
    const school = await School.findOne({ name: schoolName });
    if (!school) return res.status(400).json("SchoolNotFound");
  }

  const draftForm = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: schoolName,
    price: price,
    status: "draft",
    imagePaths: imagePaths,
  };

  const draft = await Listing.create(draftForm);

  return res.status(200).json(draft);
});

router.put("/:id", isAuthenticated, async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingNotFound");

  const {
    title,
    clothingType,
    description,
    size,
    condition,
    schoolName,
    price,
    imagePaths,
  } = req.body;

  const user = await User.findById(req.uid);
  if (!user) return res.status(400).json("SellerNotFound");

  if (schoolName !== "") {
    const school = await School.findOne({ name: schoolName });
    if (!school) return res.status(400).json("SchoolNotFound");
  }

  const newDraftForm = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: schoolName,
    price: price,
    status: "draft",
    imagePaths: imagePaths,
  };

  for (const imagePath of listing.imagePaths) {
    if (!imagePaths.includes(imagePath)) {
      getStorage(admin.app()).bucket().file(imagePath).delete();
    }
  }

  // const newListingDraft = await Listing.updateOne(
  //   { _id: req.params.id },
  //   newDraftForm
  // ).catch((err) => console.log(err));

  const newListingDraft = await listing.update(newDraftForm);

  return res.status(200).json(newListingDraft);
});

router.delete("/:id", isAuthenticated, async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingNotFound");

  const user = await User.findById(req.uid);
  if (!user) return res.status(400).json("SellerNotFound");

  if (user._id !== listing.seller) return res.status(400).json("NoOwnership");

  for (const imagePath of listing.imagePaths) {
    getStorage(admin.app()).bucket().file(imagePath).delete();
  }

  listing.delete();

  return res.status(200).json("ListingDeleted");
});

export { router };
