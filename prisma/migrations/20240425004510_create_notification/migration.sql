-- CreateTable
CREATE TABLE "notifications" (
    "id" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "wellId" VARCHAR(50) NOT NULL,
    "Created-At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "wells"("id") ON DELETE CASCADE ON UPDATE CASCADE;
