import mongoose, { Schema } from "mongoose";
import { schoolSchema } from "./school";

const listingDraftSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  clothingType: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  school: {
    type: schoolSchema,
    required: true,
  },
  images: {
    type: Array<FileList | null | undefined>,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ListingDraft = mongoose.model("ListingDraft", listingDraftSchema);

export { ListingDraft, listingDraftSchema };
