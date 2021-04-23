-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CMSPageType" AS ENUM ('STANDARD', 'GALLERY', 'ARTICLE', 'BLOG', 'NEWS');

-- CreateEnum
CREATE TYPE "PermissionFlag" AS ENUM ('FREE_PERMISSION', 'PAID_PERMISSION', 'EDITOR_PERMISSIONS', 'ADMIN_PERMISSION');

-- CreateTable
CREATE TABLE "product_image" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "medium" VARCHAR(255) NOT NULL,
    "original" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "is_gallery_image" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_page_image" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "medium" VARCHAR(255) NOT NULL,
    "original" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "cmspage_id" INTEGER NOT NULL,
    "is_gallery_image" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_page" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'DRAFT',
    "cms_page_type" "CMSPageType" NOT NULL DEFAULT E'STANDARD',
    "body" TEXT NOT NULL,
    "custom_fields" JSONB NOT NULL,
    "icon" VARCHAR(120) NOT NULL,
    "color" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_material" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "icon" VARCHAR(120) NOT NULL,
    "color" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'DRAFT',
    "description" TEXT NOT NULL,
    "icon" VARCHAR(120) NOT NULL,
    "color" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT E'DRAFT',
    "description" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "category_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "user_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),
    "tokens" TEXT[],
    "permission_flags" "PermissionFlag" NOT NULL DEFAULT E'EDITOR_PERMISSIONS',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToProductMaterial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "cms_page.slug_index" ON "cms_page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cms_page.slug_unique" ON "cms_page"("slug");

-- CreateIndex
CREATE INDEX "product_material.slug_index" ON "product_material"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_material.slug_unique" ON "product_material"("slug");

-- CreateIndex
CREATE INDEX "product_category.slug_index" ON "product_category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_category.slug_unique" ON "product_category"("slug");

-- CreateIndex
CREATE INDEX "product.slug_sku_index" ON "product"("slug", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "product.slug_sku_unique" ON "product"("slug", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "profile.user_id_unique" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductMaterial_AB_unique" ON "_ProductToProductMaterial"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductMaterial_B_index" ON "_ProductToProductMaterial"("B");

-- AddForeignKey
ALTER TABLE "product_image" ADD FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cms_page_image" ADD FOREIGN KEY ("cmspage_id") REFERENCES "cms_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductMaterial" ADD FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductMaterial" ADD FOREIGN KEY ("B") REFERENCES "product_material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
