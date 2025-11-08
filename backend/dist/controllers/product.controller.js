import * as ProductServices from "../services/product.service";
import logger from "../utils/logger";
export const createProductHandler = async (req, res) => {
    try {
        // Lấy các field từ body
        const { productName, price, quantity } = req.body;
        if (!productName || !price || !quantity) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Lấy các file upload (mảng)
        const files = req.files || [];
        // Gọi service để tạo sản phẩm + upload ảnh
        const productId = await ProductServices.createProduct(productName, Number(price), Number(quantity), files);
        res.status(201).json({
            productId,
            message: "Product created successfully",
            // images, // có thể trả về URL ảnh nếu cần
        });
    }
    catch (err) {
        console.error("Create product error:", err);
        res.status(500).json({ error: "Failed to create product" });
    }
};
export const getPaginateProductHandler = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const paginateProduct = await ProductServices.getPaginatedProducts(page, limit);
    res.status(200).json(paginateProduct);
};
export const deleteProductByIdHandler = async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    await ProductServices.deleteProdcut(productId);
    return res.status(200).json("deleteed");
};
export const getProductDetailByIdHandler = async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    const productDetail = await ProductServices.getProductDetailById(productId);
    if (!productDetail) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productDetail);
};
export const updateProductHandler = async (req, res) => {
    const { productId } = req.params;
    const { productName, price, quantity } = req.body;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    const files = req.files || [];
    const fileToDelete = req.body.deletedImages ? JSON.parse(req.body.deletedImages) : [];
    logger.info(`Files to delete: ${fileToDelete}`);
    const updatedProduct = await ProductServices.updateProduct(productId, productName, Number(price), Number(quantity), files, fileToDelete);
    return res.status(200).json(updatedProduct);
};
//# sourceMappingURL=product.controller.js.map