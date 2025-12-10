import minioConfig from "@config/minio.config";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { upload } from "lib/multer";
import { catchAsync } from "utils/catch-async";
import { ensurePublicBucket, uploadFile } from "utils/minio";

const createProductImagesRoute = Router();

createProductImagesRoute.post("/:productId", upload.array('images'), catchAsync(async (req, res) => {
    const { productId } = req.params;
    const files = req.files as Express.Multer.File[];
    ensurePublicBucket("product")
    uploadFile("product-images")
    res.status(StatusCodes.CREATED).json({ message: "upload success" });
}));

export default createProductImagesRoute;