-- CreateTable
CREATE TABLE "perusahaan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,

    CONSTRAINT "perusahaan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "perusahaan_name_key" ON "perusahaan"("name");
