import express from "express";
import multer from "multer";
import { getVideos, uploadVideo } from "../controllers/videoController.js";

const router = express.Router();

// store file in memory, not on disk
const upload = multer({ storage: multer.memoryStorage() });

router.get("/videos", getVideos);

// IMPORTANT FIX: match frontend ("/uploads")
router.post("/uploads", upload.single("video"), uploadVideo);

export default router;
