import mongoose, { Schema } from "mongoose";

const uploadSchema = new Schema({
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

const Upload = mongoose.model("Image", uploadSchema);

export { Upload, uploadSchema };
