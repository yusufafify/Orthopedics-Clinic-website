import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Transforming Image to URL
router.post("/", async (req, res) => {
  try {
    if (!req.body.photo) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
    }

    const photoUrl = await cloudinary.uploader.upload(req.body.photo);

    res.status(201).json({
      success: true,
      data: photoUrl.url,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
