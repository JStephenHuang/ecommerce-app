import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mutler from "multer";
import { router as userRouter } from "./routes/user";
import { router as authRouter } from "./routes/auth";
import { router as listingRouter } from "./routes/listing";
import { router as cartRouter } from "./routes/cart";
import { router as schoolRouter } from "./routes/school";
import { router as reviewRouter } from "./routes/review";

dotenv.config();

const corsConfig = {
  origin: ["http://localhost:3000", "http://192.168.2.38:3000"],
  credentials: true,
};

const app = express();
const port = process.env.PORT;

app.use(cors(corsConfig));
app.use(express.json());

const uri = process.env.MONGODB_URI as string;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const storage = mutler.memoryStorage();
const upload = mutler({ storage: storage });

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/listing", listingRouter);
app.use("/cart", cartRouter);
app.use("/school", schoolRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
