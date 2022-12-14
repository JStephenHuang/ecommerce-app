import { Router, Request, Response } from "express";
import { Listing, listingType } from "../models/listing";
import { User } from "../models/user";
import { School } from "../models/school";
import mutler from "multer";

const storage = mutler.memoryStorage();
// const upload = mutler({ storage: storage });

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const listings = await Listing.find()
    .populate({ path: "school" })
    .populate({ path: "seller" });
  if (!listings) return res.status(400).json("ListingsNotFound");
  return res.status(200).json(listings);
});

router.get("/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "school" })
    .populate({ path: "seller" });

  if (!listing) return res.status(400).json("ListingNotFound");
  return res.status(200).json(listing);
});

router.get("/:type", async (req: Request, res: Response) => {
  const listings = await Listing.find({ clothingType: req.query.type });
  if (!listings) return res.status(400).json("ListingsNotFound");
  return res.status(200).json(listings);
});

router.post("/like/:id", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");

  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingsNotFound");
  listing.likes.push(Object(user._id));
  listing.save();
});

router.post("/unlike/:id", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");

  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingsNotFound");

  listing.likes.splice(listing.likes.indexOf(Object(user._id)), 1);
  listing.save();
});

// router.post(
//   "/sell-form/upload",
//   upload.single("file"),
//   async (req: Request, res: Response) => {
//     res.json({ file: req.file });
//   }
// );

router.get("/listing-form/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingsNotFound");

  const school = await School.findById(listing.school);
  if (!school) return res.status(400).json("SchoolNotFound");

  const seller = await User.findById(listing.seller);
  if (!seller) return res.status(400).json("SellerNotFound");

  const listingForm = {
    title: listing.title,
    clothingType: listing.clothingType,
    seller: seller.username,
    description: listing.description,
    size: listing.size,
    condition: listing.condition,
    schoolName: school.name,
    price: listing.price,
  };

  console.log(listingForm);

  return res.status(200).json(listingForm);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingNotFoun");

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

  const newListingForm = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: school._id,
    price: price,
  };

  listing.update(newListingForm);
  listing.save();
});

router.post("/publish", async (req: Request, res: Response) => {
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

  if (title === "") {
    return res.status(400).json("MissingTitle");
  }
  if (clothingType === "") {
    return res.status(400).json("MissingType");
  }
  if (size === "") {
    return res.status(400).json("MissingSize");
  }
  if (condition === "") {
    return res.status(400).json("MissingCondition");
  }
  if (description === "") {
    return res.status(400).json("MissingDescription");
  }
  if (price === 0) {
    return res.status(400).json("InvalidPrice");
  }

  // creating listing

  const listingForm = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: school._id,
    price: price,
  };

  const newListing = new Listing(listingForm);
  const listingProcess = await newListing
    .save()
    .then((listing) => {
      school.listings.push(listing);
      user.listings.push(listing);
      school.save();
      user.save();
      return res.status(200).json("ListingInStore");
    })
    .catch((err) => {
      return res.status(400).send("Error: " + err);
    });
});

router.post("/add-cart/:id", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");

  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ArticeNotFound");

  const cart = user.cart;
  cart.listings.push(listing);

  listing.inCart.push(Object(user._id));

  listing.save();
  user.save();

  return res.status(200).json(cart);
});

router.post("/delete/:id", async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json("UserNotFound");

  const listingId = req.params.id;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(400).json("ListingNotFound");

  const school = await School.findOne({ _id: listing.school });
  if (!school) return res.status(400).json("SchoolNotFound");

  const seller = await User.findById(listing.seller);
  if (!seller) return res.status(400).json("SellerNotFound");

  const userId = user._id;
  const sellerId = seller._id;

  if (sellerId.toHexString() !== userId.toHexString())
    return res.status(200).json("NoOwnership");

  const schoolListings = school.listings;
  const userListings = user.listings;

  const cartListings = user.cart.listings;

  console.log(cartListings);

  const schoolListingIndex = schoolListings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);
  const userListingIndex = userListings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);
  const cartListingIndex = cartListings
    .map((listing) => listing._id?.toHexString())
    .indexOf(listingId);

  // Removing article

  cartListings.splice(cartListingIndex, 1);
  schoolListings.splice(schoolListingIndex, 1);
  userListings.splice(userListingIndex, 1);

  school.save();
  user.save();

  listing.delete();

  res.status(200).json("ListingRemoved");
});

export { router };
