import { Video } from "../models/Video.js";
import { getVideoContainerClient } from "../config/azure.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=700&fit=crop";

// GET /api/videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ videos });
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

// POST /api/upload
export const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Video file is required" });
    }
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Upload to Azure Blob Storage
    const containerClient = getVideoContainerClient();
    if (!containerClient) {
      return res
        .status(500)
        .json({ message: "Storage not configured on server" });
    }

    const extension = path.extname(file.originalname) || ".mp4";
    const blobName = `${uuidv4()}${extension}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype }
    });

    const videoUrl = blockBlobClient.url;

    // For MVP: use a default thumbnail; later you could generate real thumbnails
    const thumbnail = DEFAULT_THUMBNAIL;

    const video = await Video.create({
      title,
      videoUrl,
      thumbnail,
      views: 0
    });

    res.status(201).json({ video });
  } catch (err) {
    console.error("Error uploading video:", err);
    res.status(500).json({ message: "Failed to upload video" });
  }
};