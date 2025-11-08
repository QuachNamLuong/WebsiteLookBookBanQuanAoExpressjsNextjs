import { Router } from "express";
import { catchAsync } from "../utils/catch-async";
import * as ProductImageController from "../controllers/product-image.controller";
import { upload } from "../services/product.service";

const productImageRouter = Router();
productImageRouter.get("/product-image/:productId", catchAsync(ProductImageController.getProductImagesByProductIdHandler));

export default productImageRouter;