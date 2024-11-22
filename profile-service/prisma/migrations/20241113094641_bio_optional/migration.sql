-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "profileImg" SET DEFAULT 'https://pet-courses-bucket.s3.eu-north-1.amazonaws.com/photo_2024-02-09_12-19-04.jpg';
