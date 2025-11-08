/*
  Warnings:

  - The required column `objectName` was added to the `product_images` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_images" (
    "product_image_id" TEXT NOT NULL PRIMARY KEY,
    "productImageUrl" TEXT NOT NULL,
    "product_image_name" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product_images" ("productId", "productImageUrl", "product_image_id", "product_image_name") SELECT "productId", "productImageUrl", "product_image_id", "product_image_name" FROM "product_images";
DROP TABLE "product_images";
ALTER TABLE "new_product_images" RENAME TO "product_images";
CREATE UNIQUE INDEX "product_images_productImageUrl_key" ON "product_images"("productImageUrl");
CREATE UNIQUE INDEX "product_images_product_image_name_key" ON "product_images"("product_image_name");
CREATE UNIQUE INDEX "product_images_objectName_key" ON "product_images"("objectName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
