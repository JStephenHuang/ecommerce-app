import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { User } from "../models/user";
import { School } from "../models/school";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  Listing.find()
    .then((listings) => {
      return res.status(200).json(listings);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req: Request, res: Response) => {
  Listing.findOne({ _id: req.params.id })
    .then((listing) => {
      return res.status(200).json(listing);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/sell", async (req: Request, res: Response) => {
  const {
    title,
    productType,
    sellerName,
    description,
    size,
    schoolName,
    price,
  } = req.body;
  const school = await School.findOne({ name: schoolName });
  const user = await User.findOne({ username: sellerName });
  if (!school) return res.status(400).json("SchoolNotFound");
  if (!user) return res.status(400).json("SellerNotFound");
  console.log(school);
  console.log(user);
  const seller = user.username;
  console.log(seller);
  const newListing = new Listing({
    title,
    productType,
    seller,
    description,
    size,
    school,
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
  listing.delete();
  const schoolProducts = school.products;
  const userListings = user.listings;
  schoolProducts.splice(schoolProducts.indexOf(listing.school.name), 1);
  const listingIndex = userListings
    .map((listing) => listing.seller)
    .indexOf(listing.seller);
  userListings.splice(listingIndex, 1);
  school.save();
  user.save();
  res.status(200).json("ListingRemoved");
});

export { router };
