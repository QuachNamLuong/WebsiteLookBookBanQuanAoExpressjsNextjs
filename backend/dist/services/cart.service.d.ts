export declare const addCartItem: (userId: string, productId: string) => Promise<{
    product: {
        productId: string;
        productName: string;
        quantity: number;
        createdAt: Date;
        updateAt: Date;
        price: import("../generated/prisma/runtime/library").Decimal;
    };
} & {
    userId: string;
    productId: string;
    quantity: number;
    id: string;
}>;
export declare const updateCartItemQuantity: (cartItemId: string, quantity: number) => Promise<void>;
//# sourceMappingURL=cart.service.d.ts.map