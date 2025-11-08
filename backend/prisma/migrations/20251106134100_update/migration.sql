/*
  Warnings:

  - Added the required column `color` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameMeaning` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProductSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToProductSize" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToProductSize_A_fkey" FOREIGN KEY ("A") REFERENCES "products" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToProductSize_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductSize" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "product_id" TEXT NOT NULL PRIMARY KEY,
    "product_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL NOT NULL,
    "material" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "nameMeaning" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "usage" TEXT NOT NULL
);
INSERT INTO "new_products" ("createdAt", "price", "product_id", "product_name", "quantity", "updateAt") SELECT "createdAt", "price", "product_id", "product_name", "quantity", "updateAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_product_name_key" ON "products"("product_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ProductSize_size_key" ON "ProductSize"("size");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductSize_AB_unique" ON "_ProductToProductSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductSize_B_index" ON "_ProductToProductSize"("B");
