import type { Product } from "../generated/prisma";
import prisma from "../lib/prisma";

export const createProduct = async () => {
  const newProduct = await prisma.product.create({data: {} as Product});
};

export const updateProduct = async () => {
  const newProduct = await prisma.product.create({data: {} as Product});
};

export const deleteProdcut = async () => {
  const newProduct = await prisma.product.create({data: {} as Product});
};