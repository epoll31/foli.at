/*
  Warnings:

  - Changed the type of `type` on the `Link` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('GITHUB', 'LINKEDIN', 'TWITTER', 'PORTFOLIO', 'OTHER');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "type",
ADD COLUMN     "type" "LinkType" NOT NULL;
