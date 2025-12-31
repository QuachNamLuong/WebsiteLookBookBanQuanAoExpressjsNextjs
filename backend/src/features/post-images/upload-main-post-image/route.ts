import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { uploadImageHandler } from "./handler";
import { upload } from "lib/multer";

const uploadMainPostImageRoute = Router();

uploadMainPostImageRoute.post("/:postId", upload.single("file"), catchAsync(uploadImageHandler));

export default uploadMainPostImageRoute;