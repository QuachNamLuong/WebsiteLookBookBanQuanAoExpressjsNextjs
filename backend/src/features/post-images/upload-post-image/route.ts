import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { uploadImageHandler } from "./handler";
import { upload } from "lib/multer";

const uploadPostImageRoute = Router();

uploadPostImageRoute.post("/", upload.single("file"), catchAsync(uploadImageHandler));

export default uploadPostImageRoute;