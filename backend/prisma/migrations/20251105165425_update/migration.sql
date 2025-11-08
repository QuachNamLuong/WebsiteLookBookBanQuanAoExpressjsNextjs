-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_images" (
    "product_image_id" TEXT NOT NULL PRIMARY KEY,
    "productImageUrl" TEXT NOT NULL,
    "product_image_name" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("product_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_images" ("objectName", "productId", "productImageUrl", "product_image_id", "product_image_name") SELECT "objectName", "productId", "productImageUrl", "product_image_id", "product_image_name" FROM "product_images";
DROP TABLE "product_images";
ALTER TABLE "new_product_images" RENAME TO "product_images";
CREATE UNIQUE INDEX "product_images_productImageUrl_key" ON "product_images"("productImageUrl");
CREATE UNIQUE INDEX "product_images_product_image_name_key" ON "product_images"("product_image_name");
CREATE UNIQUE INDEX "product_images_objectName_key" ON "product_images"("objectName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
