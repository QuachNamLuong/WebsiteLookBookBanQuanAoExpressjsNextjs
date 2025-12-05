import type { Product } from "@generated/prisma/client";
import type { GetProductByIdResponseSchema } from "./schema";

export function productToGetProductByIdResponseSchema(product: Product): GetProductByIdResponseSchema{
  return {
    product: {
      id: product.id,
      code: product.code,
      name: product.name
    }
  }
}