import getMeRoute from "@features/auth/get-me/route";
import isAdminRoute from "@features/auth/is-admin/route";
import loginRoute from "@features/auth/login/route";
import logoutRoute from "@features/auth/logout/route";
import refreshTokenRoute from "@features/auth/refresh-token/route";
import registerRoute from "@features/auth/register/route";
import addProductToCartRoute from "@features/cart/add-product-to-cart/route";
import getNumberOfCartItem from "@features/cart/get-number-of-cart-item/route";
import getUserCartDetailRoute from "@features/cart/get-user-cart-detail/route";
import removeCartItemRoute from "@features/cart/remove-cart-item/route";
import getCategoriesRoute from "@features/categories/get-categories/route";
import getPostCategoriesRoute from "@features/post-categories/get-post-categories/route";
import uploadMainPostImageRoute from "@features/post-images/upload-main-post-image/route";
import uploadPostImageRoute from "@features/post-images/upload-post-image/route";
import createPostRoute from "@features/posts/create-post/route";
import deletePostByIdRoute from "@features/posts/delete-post-by-id/route";
import getPostByIdRoute from "@features/posts/get-post-by-id/route";
import getPostBySlugRoute from "@features/posts/get-post-by-slug/route";
import getPostsRoute from "@features/posts/get-posts/route";
import updatePostRoute from "@features/posts/update-post/route";
import getAllProductCollectionsRoute from "@features/product-collections/get-all-product-collections/route";
import createProductImagesRoute from "@features/product-images/create-product-images/route";
import getProductImageByProductId from "@features/product-images/get-product-image-by-product-id/route";
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
appRoute.use("/api/auth", isAdminRoute);

// Product
appRoute.use("/api/products", getProductsRoute);
appRoute.use("/api/products", getProductByIdRoute);
appRoute.use("/api/products", createProductRoute);
appRoute.use("/api/products", updateProductRoute);
appRoute.use("/api/products", createProductRoute);
appRoute.use("/api/products", deleteProductByIdRoute);

// Product Image
appRoute.use("/api/product-images", createProductImagesRoute);
appRoute.use("/api/product-images", getProductImageByProductId);


//Category
appRoute.use("/api/categories", getCategoriesRoute);

//Post
appRoute.use("/api/posts", createPostRoute);
appRoute.use("/api/posts", getPostsRoute);
appRoute.use("/api/posts", getPostByIdRoute);
appRoute.use("/api/posts", updatePostRoute);
appRoute.use("/api/posts", deletePostByIdRoute);
appRoute.use("/api/posts", getPostBySlugRoute);

// Post category
appRoute.use("/api/post-categories", getPostCategoriesRoute);

// Post image
appRoute.use("/api/post-images", uploadPostImageRoute);
appRoute.use("/api/post-images", uploadMainPostImageRoute);

// Cart 
appRoute.use("/api/carts", addProductToCartRoute);
appRoute.use("/api/carts", getNumberOfCartItem);
appRoute.use("/api/carts", removeCartItemRoute);
appRoute.use("/api/carts", getUserCartDetailRoute);

// Product Collection
appRoute.use("/api/product-collections", getAllProductCollectionsRoute);


export default appRoute;