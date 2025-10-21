-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" TEXT NOT NULL PRIMARY KEY,
    "product_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "product_images" (
    "product_image_id" TEXT NOT NULL PRIMARY KEY,
    "product_image_name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" TEXT NOT NULL PRIMARY KEY,
    "order_total_price" DECIMAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_item_id" TEXT NOT NULL PRIMARY KEY,
    "order_item_quantity" INTEGER NOT NULL,
    "order_item_unit_price" DECIMAL NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("product_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_hash_key" ON "users"("password_hash");

-- CreateIndex
CREATE UNIQUE INDEX "products_product_name_key" ON "products"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_product_image_name_key" ON "product_images"("product_image_name");
