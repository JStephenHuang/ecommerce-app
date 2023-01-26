import { Router, Request, Response } from "express";
import { Listing } from "../models/listing";
import { isAuthenticated } from "../middleware/is-authenticated";
import { User } from "../models/user";
import { School } from "../models/school";
import { isOnboarded } from "../middleware/is-onboarded";
import { getStorage } from "firebase-admin/storage";
import admin from "firebase-admin";

// const storage = mutler.memoryStorage();
// const upload = mutler({ storage: storage });

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const listings = await Listing.find({ status: "active" }).populate({
    path: "seller",
  });
  if (!listings) return res.status(400).json("ListingsNotFound");
  return res.status(200).json(listings);
});

router.get("/explore", async (req: Request, res: Response) => {
  const filters = req.query;
  console.log(filters);
  for (const key in filters) {
    filters[key] = { $in: filters[key] };
  }

  const listings = await Listing.find({
    $and: [{ status: "active" }, filters],
  }).populate({ path: "seller" });
  if (!listings) return res.status(400).json("ListingsNotFound");

  return res.status(200).json(listings);
});

router.get("/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id).populate({
    path: "seller",
  });
  if (!listing) return res.status(400).json("ListingNotFound");
  return res.status(200).json(listing);
});

router.post(
  "/like/:id",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("UserNotFound");

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(400).json("ListingsNotFound");
    listing.likes.push(Object(user._id));
    listing.save();
  }
);

router.post(
  "/unlike/:id",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("UserNotFound");

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(400).json("ListingsNotFound");

    listing.likes.splice(listing.likes.indexOf(Object(user._id)), 1);
    listing.save();
  }
);

// router.post(
//   "/sell-form/upload",
//   upload.single("file"),
//   async (req: Request, res: Response) => {
//     res.json({ file: req.file });
//   }
// );

router.post(
  "/:listingId",
  isAuthenticated,
  isOnboarded,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid);
    if (!user) return res.status(400).json("UserNotFound");

    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(400).json("ListingNotFound");

    const cart = user.cart;
    cart.push(listing._id.toHexString());

    listing.inCart.push(user._id);
    listing.save();
    user.save();

    return res.status(200).json(cart);
  }
);

router.get("/form/:id", async (req: Request, res: Response) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(400).json("ListingsNotFound");

  if (listing.school !== "") {
    const school = await School.findOne({ name: listing.school });
    if (!school) return res.status(400).json("SchoolNotFound");
  }

  const listingForm = {
    title: listing.title,
    clothingType: listing.clothingType,
    description: listing.description,
    size: listing.size,
    condition: listing.condition,
    schoolName: listing.school,
    price: listing.price,
    status: listing.status,
    imagePaths: listing.imagePaths,
  };

  return res.status(200).json(listingForm);
});

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

  const user = await User.findById(req.uid);
  if (!user) return res.status(200).json("SellerNotFound");

  const school = await School.findOne({ name: schoolName });
  if (!school) return res.status(400).json("SchoolNotFound");

  if (title === "") return res.status(400).json("MissingTitle");

  if (clothingType === "") return res.status(400).json("MissingType");

  if (size === "") return res.status(400).json("MissingSize");

  if (condition === "") return res.status(400).json("MissingCondition");

  if (description === "") return res.status(400).json("MissingDescription");

  if (price === "") return res.status(400).json("InvalidPrice");

  if (imagePaths.length === 0) return res.status(400).json("MinOneImage");

  // creating listing

  const listingForm = {
    title: title,
    clothingType: clothingType,
    description: description,
    size: size,
    condition: condition,
    seller: user._id,
    school: schoolName,
    price: price,
    status: "active",
    imagePaths: imagePaths,
  };

  const listing = await Listing.create(listingForm);

  return res.status(200).json(listing._id);
});

router.put(
  "/:listingId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const listing = await Listing.findById(req.params.listingId);
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

    const school = await School.findOne({ name: schoolName });
    if (!school) return res.status(412).json("SchoolNotFound");

    if (title === "") {
      return res.status(412).json("MissingTitle");
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
    if (price === "") {
      return res.status(400).json("InvalidPrice");
    }

    const newListingForm = {
      title: title,
      clothingType: clothingType,
      description: description,
      size: size,
      condition: condition,
      seller: user._id,
      school: schoolName,
      price: price,
      status: "active",
      imagePaths: imagePaths,
    };

    for (const imagePath of listing.imagePaths) {
      if (!imagePaths.includes(imagePath)) {
        getStorage(admin.app()).bucket().file(imagePath).delete();
      }
    }

    const newListing = await listing.update(newListingForm);

    return res.status(200).json(newListing);
  }
);

router.delete(
  "/:listingId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.uid);
    if (!user) return res.status(400).json("UserNotFound");

    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(400).json("ListingNotFound");

    const seller = await User.findById(listing.seller);
    if (!seller) return res.status(400).json("SellerNotFound");

    const userId = user._id;
    const sellerId = seller._id;

    if (sellerId !== userId) return res.status(200).json("NoOwnership");

    // Removing article

    for (const userId of listing.inCart) {
      const user = await User.findById(userId);
      if (!user) return res.status(400).json("UserNotFound");
      user.cart.splice(user.cart.indexOf(listing._id.toHexString()), 1);
    }

    for (const imagePath of listing.imagePaths) {
      getStorage(admin.app())
        .bucket()
        .file(imagePath)
        .delete()
        .catch((err) => {
          if (
            err.errors.message ===
            `No such object: ecommerce-app-76de8.appspot.com/${imagePath}`
          ) {
            return res.status(404).json(err);
          }
        });
    }

    user.save();
    listing.delete();

    return res.status(200).json("ListingRemoved");
  }
);

export { router };
