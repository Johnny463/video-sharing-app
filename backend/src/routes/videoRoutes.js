import express from "express";
import multer from "multer";
import { getVideos, uploadVideo } from "../controllers/videoController.js";

const router = express.Router();

// store file in memory, not on disk
const upload = multer({ storage: multer.memoryStorage() });

router.get("/videos", getVideos);
router.post("/upload", upload.single("video"), uploadVideo);

export default router;