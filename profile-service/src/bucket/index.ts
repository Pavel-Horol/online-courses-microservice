import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import multer from "multer";

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

export async function deleteImageFromS3(key: string) {
    const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    }
    try {
        await s3.send(new DeleteObjectCommand(deleteParams))
    }catch (error) {
        console.error("", error)
    }
}

export async function uploadImageToS3 (file: Express.Multer.File) {
    const key = `profile_images/${Date.now()}_${file.originalname}`
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    }
    await s3.send(new PutObjectCommand(uploadParams))

    return key
}


