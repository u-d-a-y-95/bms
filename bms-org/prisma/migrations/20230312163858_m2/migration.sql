-- DropIndex
DROP INDEX "Company_email_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "email" DROP NOT NULL;
