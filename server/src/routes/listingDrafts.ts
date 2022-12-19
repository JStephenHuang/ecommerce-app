import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { School } from "../models/school";
import { User } from "../models/user";

const router = Router();

router.get("/drafts/:username", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username }).populate({
    path: "listings",
    populate: ["seller", "school"],
  });
  if (!user) return res.status(400).json("UserNotFound");
  return res.status(200).json(user.listings);
});

router.get("/draft-form/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingsNotFound");

  const school = await School.findById(listing.school);
  if (!school) return res.status(400).json("SchoolNotFound");

  const seller = await User.findById(listing.seller);
  if (!seller) return res.status(400).json("SellerNotFound");

  const listingDraftForm = {
    title: listing.title,
    clothingType: listing.clothingType,
    seller: seller.username,
    description: listing.description,
    size: listing.size,
    condition: listing.condition,
    schoolName: school.name,
    price: listing.price,
  };

  return res.status(200).json(listingDraftForm);
});

router.post("/draft", async (req: Request, res: Response) => {
  const {
    title,
    clothingType,
    seller,
    description,
    size,
    condition,
    schoolName,
    price,
  } = req.body;

  const user = await User.findOne({ username: seller });
  if (!user) return res.status(400).json("SellerNotFound");

  const school = await School.findOne({ name: schoolName });
  if (!school) return res.status(400).json("SchoolNotFound");

  const listingObject = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: school._id,
    price: price,
  };
  const newListingDraft = new Listing(listingObject);
  const listingProcess = await newListingDraft
    .save()
    .then((listingDraft) => {
      user.listingDrafts.push(listingDraft);
      user.save();
      res.status(200).json("ListingDraftSaved");
    })
    .catch((err) => {
      return res.status(400).send("Error: " + err);
    });
});

export { router };
