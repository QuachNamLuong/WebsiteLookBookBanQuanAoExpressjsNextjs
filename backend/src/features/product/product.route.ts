import { Router } from "express";
import { catchAsync } from "../../utils/catch-async";
import * as ProductController from "../../controllers/product.controller";
import { upload } from "../../services/product.service";

const productRoutes = Router();
productRoutes.post("/product", upload.array("images"), catchAsync(ProductController.createProductHandler));
productRoutes.get("/product", catchAsync(ProductController.getPaginateProductHandler));
productRoutes.delete("/product/:productId", catchAsync(ProductController.deleteProductByIdHandler));
productRoutes.get("/product/:productId", catchAsync(ProductController.getProductDetailByIdHandler));
productRoutes.put("/product/:productId", upload.array("images"), catchAsync(ProductController.updateProductHandler));
export default productRoutes;