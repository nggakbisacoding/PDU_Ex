/*
  Warnings:

  - The primary key for the `companies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `companyId` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - The primary key for the `places` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `places` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `companyId` on the `places` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - The primary key for the `records` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `records` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `wellId` on the `records` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - The primary key for the `wells` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `wells` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `wells` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `placeId` on the `wells` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_companyId_fkey";

-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_companyId_fkey";

-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_wellId_fkey";

-- DropForeignKey
ALTER TABLE "wells" DROP CONSTRAINT "wells_placeId_fkey";

-- AlterTable
ALTER TABLE "companies" DROP CONSTRAINT "companies_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "companies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "employees" DROP CONSTRAINT "employees_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "companyId" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "places" DROP CONSTRAINT "places_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "companyId" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "places_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "records" DROP CONSTRAINT "records_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "wellId" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "records_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "wells" DROP CONSTRAINT "wells_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "placeId" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "wells_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wells" ADD CONSTRAINT "wells_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "wells"("id") ON DELETE CASCADE ON UPDATE CASCADE;
