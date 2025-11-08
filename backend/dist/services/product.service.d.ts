import multer from "multer";
export declare const upload: multer.Multer;
export declare const createProduct: (productName: string, price: number, quantity: number, files: Express.Multer.File[]) => Promise<string>;
export declare const updateProduct: (productId: string, productName: string, price: number, quantity: number, files: Express.Multer.File[], fileToDelete: string[]) => Promise<void>;
export declare const deleteProdcut: (productId: string) => Promise<void>;
export declare const getPaginatedProducts: (page?: number, limit?: number) => Promise<{
    data: ({
        productImage: {
            productId: string;
            productImageId: string;
            productImageUrl: string;
            productImageName: string;
            objectName: string;
        }[];
    } & {
        productId: string;
        productName: string;
        quantity: number;
        createdAt: Date;
        updateAt: Date;
        price: import("../generated/prisma/runtime/library").Decimal;
    })[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        hasNextPage: boolean;
    };
}>;
export declare const getProductDetailById: (productId: string) => Promise<({
    productImage: {
        productId: string;
        productImageId: string;
        productImageUrl: string;
        productImageName: string;
        objectName: string;
    }[];
} & {
    productId: string;
    productName: string;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
    price: import("../generated/prisma/runtime/library").Decimal;
}) | null | undefined>;
//# sourceMappingURL=product.service.d.ts.map