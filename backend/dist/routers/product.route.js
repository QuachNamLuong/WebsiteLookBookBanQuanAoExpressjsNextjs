import { Router } from "express";
import { catchAsync } from "../utils/catch-async";
import * as ProductController from "../controllers/product.controller";
import { upload } from "../services/product.service";
const productRouter = Router();
productRouter.post("/product", upload.array("images"), catchAsync(ProductController.createProductHandler));
productRouter.get("/product", catchAsync(ProductController.getPaginateProductHandler));
productRouter.delete("/product/:productId", catchAsync(ProductController.deleteProductByIdHandler));
productRouter.get("/product/:productId", catchAsync(ProductController.getProductDetailByIdHandler));
productRouter.put("/product/:productId", upload.array("images"), catchAsync(ProductController.updateProductHandler));
export default productRouter;
//# sourceMappingURL=product.route.js.map