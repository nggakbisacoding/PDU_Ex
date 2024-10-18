-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_companyId_fkey";

-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_companyId_fkey";

-- DropForeignKey
ALTER TABLE "wells" DROP CONSTRAINT "wells_placeId_fkey";

-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "Date-Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "BitDepth(m)" DOUBLE PRECISION,
    "Scfm" DOUBLE PRECISION,
    "MudCondIn(mmho)" DOUBLE PRECISION,
    "MudCondOut(mmho)" DOUBLE PRECISION,
    "BlockPos(m)" DOUBLE PRECISION,
    "WOB(klb)" DOUBLE PRECISION,
    "ROPi(m/hr)" DOUBLE PRECISION,
    "BVDepth(m)" DOUBLE PRECISION,
    "Torque(klb.ft)" DOUBLE PRECISION,
    "RPM" DOUBLE PRECISION,
    "HKLDP(klb)" DOUBLE PRECISION,
    "LogDepth(m)" DOUBLE PRECISION,
    "H2S1_(ppm)" DOUBLE PRECISION,
    "MudFlowOutp" DOUBLE PRECISION,
    "TotSPM" DOUBLE PRECISION,
    "SPPress(psi)" DOUBLE PRECISION,
    "MudFlowIn(gpm)" DOUBLE PRECISION,
    "CO2_1(%)" DOUBLE PRECISION,
    "Gas(%)" DOUBLE PRECISION,
    "MudTempIn(C)" DOUBLE PRECISION,
    "MudTempOut(C)" DOUBLE PRECISION,
    "TankVolTot(bbl)" DOUBLE PRECISION,
    "wellId" VARCHAR(255) NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wells" ADD CONSTRAINT "wells_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_wellId_fkey" FOREIGN KEY ("wellId") REFERENCES "wells"("id") ON DELETE CASCADE ON UPDATE CASCADE;
