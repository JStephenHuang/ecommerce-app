import { Router, Request, Response } from "express";
import { upload } from "../middleware/mutler";
import { Image } from "../models/image";
import fs from "fs";

const router = Router();

router.post("/uploadimg", upload.single("listingImg"), (req, res) => {});

export { router };
