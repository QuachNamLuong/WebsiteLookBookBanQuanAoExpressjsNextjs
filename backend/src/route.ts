import getMeRoute from "@features/auth/get-me/route";
import loginRoute from "@features/auth/login/route";
import logoutRoute from "@features/auth/logout/route";
import refreshTokenRoute from "@features/auth/refresh-token/route";
import registerRoute from "@features/auth/register/route";
import getCategoriesRoute from "@features/categories/get-categories/route";
import createProductImagesRoute from "@features/product-images/create-product-images/route";
import createProductRoute from "@features/products/create-product/route";
import deleteProductByIdRoute from "@features/products/delete-product-by-id/route";
import getProductByIdRoute from "@features/products/get-product-by-id/route";
import getProductsRoute from "@features/products/get-products/route";
import updateProductRoute from "@features/products/update-product/route";
import { Router } from "express";

const appRoute = Router();

//Auth
appRoute.use("/api/auth", loginRoute);
appRoute.use("/api/auth", registerRoute);
appRoute.use("/api/auth", getMeRoute);
appRoute.use("/api/auth", refreshTokenRoute);
appRoute.use("/api/auth", logoutRoute);

// Product
appRoute.use("/api/products", getProductsRoute);
appRoute.use("/api/products", getProductByIdRoute);
appRoute.use("/api/products", createProductRoute);
appRoute.use("/api/products", updateProductRoute);
appRoute.use("/api/products", createProductRoute);
appRoute.use("/api/products", deleteProductByIdRoute);

// Product Image
appRoute.use("/api/product-images", createProductImagesRoute);

//Category
appRoute.use("/api/categories", getCategoriesRoute);

export default appRoute;