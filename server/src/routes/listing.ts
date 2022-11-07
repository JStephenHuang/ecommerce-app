import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { User } from "../models/user";
import { School } from "../models/school";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const listings = await Listing.find();
  if (!listings) return res.status(400).json("ListingsNotFound");
  return res.status(200).json(listings);
});

router.get("/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findOne({ _id: req.params.id });
  if (!listing) return res.status(400).json("ListingNotFound");
  return res.status(200).json(listing);
});

router.get("/:type", async (req: Request, res: Response) => {
  const listings = await Listing.find({ clothingType: req.query.type });
  if (!listings) return res.status(400).json("ListingsNotFound");
  return res.status(200).json(listings);
});

router.post("/sell", async (req: Request, res: Response) => {
  const {
    title,
    clothingType,
    sellerName,
    description,
    size,
    schoolName,
    images,
    price,
  } = req.body;
  const school = await School.findOne({ name: schoolName });
  const user = await User.findOne({ username: sellerName });
  if (!school) return res.status(400).json("SchoolNotFound");
  if (!user) return res.status(400).json("SellerNotFound");
  const seller = user.username;
  const newListing = new Listing({
    title,
    clothingType,
    seller,
    description,
    size,
    school,
    images,
    price,
  });
  newListing
    .save()
    .then((listing) => {
      school.products.push(listing);
      user.listings.push(listing);
      school.save();
      user.save();

      res.status(200).json("ListingInStore");
    })
    .catch((err) => res.status(400).send("Error: " + err));
});

router.post("/add-cart/:id", (req: Request, res: Response) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) return res.status(400).json("UserNotFound");
    const listingId = req.params.id;
    Listing.findById(listingId).then((listing) => {
      if (!listing) return res.status(400).json("ArticeNotFound");
      const cart = user.cart;
      cart.listings.push(listing);
      cart.total += listing.price;
      user.save();
      return res.status(200).json(cart);
    });
  });
});

router.post("/delete/:id", async (req: Request, res: Response) => {
  const listingId = req.params.id;
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(400).json("ListingNotFound");
  const school = await School.findOne({ name: listing.school.name });
  if (!school) return res.status(400).json("SchoolNotFound");
  if (listing.seller !== user.username)
    return res.status(200).json("NoOwnership");

  const schoolProducts = school.products;
  const userListings = user.listings;
  const userListingIndex = userListings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);
  const schoolListingIndex = schoolProducts
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);

  schoolProducts.splice(schoolListingIndex, 1);
  userListings.splice(userListingIndex, 1);

  school.save();
  user.save();

  listing.delete();

  res.status(200).json("ListingRemoved");
});

export { router };
