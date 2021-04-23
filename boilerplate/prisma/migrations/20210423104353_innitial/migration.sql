/*
  Warnings:

  - You are about to drop the column `permission_flags` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "permission_flags",
ADD COLUMN     "permissionFlags" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "PermissionFlag";
