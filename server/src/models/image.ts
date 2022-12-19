import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  fileName: {
    type: String,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);

export { Image, imageSchema };
