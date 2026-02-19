import express from "express";
import multer from "multer";
import StoredImage from "../models/StoredImage.js";

const router = express.Router();

// Memory storage for temporary processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/upload - Save to MongoDB
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newImage = new StoredImage({
            name: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });

        const savedImage = await newImage.save();

        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const fileUrl = `${baseUrl}/api/upload/image/${savedImage._id}`;

        res.json({
            data: fileUrl,
            message: "Image stored in database successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Store failed", error: error.message });
    }
});

// GET /api/upload/image/:id - Serve image from MongoDB
router.get("/image/:id", async (req, res) => {
    try {
        const image = await StoredImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set("Content-Type", image.contentType);
        // Cache for 30 days to improve performance
        res.set("Cache-Control", "public, max-age=2592000");
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching image", error: error.message });
    }
});

export default router;
