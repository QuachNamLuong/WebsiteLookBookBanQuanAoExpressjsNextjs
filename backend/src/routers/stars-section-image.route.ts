import multer from "multer";
import { uploadFile, ensureBucket } from "../utils/minio"; // adjust path
import path from "path";
import { Router, type Request, type Response } from "express";

const router = Router();
const upload = multer({ dest: "uploads/" }); // temp local storage

const BUCKET_NAME = "my-bucket";

// Ensure bucket exists on server start
ensureBucket(BUCKET_NAME).catch(console.error);


router.post("/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const objectName = req.file.originalname;

    await uploadFile(BUCKET_NAME, objectName, filePath);

    res.json({
      message: "File uploaded successfully",
      fileName: objectName
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload file", error: err });
  }
});

export default router;
