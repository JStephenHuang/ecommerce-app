import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { router as userRouter } from "./routes/user";
import { router as listingRouter } from "./routes/listing";
import { router as cartRouter } from "./routes/cart";
import { router as schoolRouter } from "./routes/school";
import { router as draftRouter } from "./routes/draft";
import { router as paymentRouter } from "./payments/payments";
import admin from "firebase-admin";
import serviceAccount from "./firebase/ecommerce-app-76de8-firebase-adminsdk-yrwsd-ba0d7b7dff.json";

dotenv.config();

const corsConfig = {
  origin: ["http://localhost:3000", "http://192.168.2.38:3000"],
  credentials: true,
};

const app = express();
const port = process.env.PORT;

app.use(cors(corsConfig));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "ecommerce-app-76de8.appspot.com/",
});

const uri = process.env.MONGODB_URI as string;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/user", userRouter);
app.use("/listing", listingRouter);
app.use("/cart", cartRouter);
app.use("/school", schoolRouter);
app.use("/draft", draftRouter);
app.use("/checkout", paymentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
