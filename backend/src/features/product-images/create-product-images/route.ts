import { Router } from "express";
import { catchAsync } from "utils/catch-async";
import { createProductImageHandler } from "./handler";
import { upload } from "lib/multer";

const createProductImageRoute = Router();

createProductImageRoute.post("/:productId", upload.single("file"), catchAsync(createProductImageHandler));

export default createProductImageRoute;