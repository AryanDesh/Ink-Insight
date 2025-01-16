-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishAt" TIMESTAMP(3),
ALTER COLUMN "title" SET DEFAULT 'Untitled',
ALTER COLUMN "content" SET DEFAULT '{}';
