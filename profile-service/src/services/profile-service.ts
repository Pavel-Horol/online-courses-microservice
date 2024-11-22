import { deleteImageFromS3, uploadImageToS3 } from "../bucket"
import { ApiError } from "../exceptions/api-error"
import prisma from "../prisma/prisma-client"
import { CreateProfileBody, UpdateProfileBody } from "../types"

class ProfileService {

    private async findProfileByUserId (userId: number) {
        return await prisma.profile.findFirst({ where: {userId} })
    }

    async uploadPhoto(userId: number, file: Express.Multer.File) {
			const profile = await prisma.profile.findFirst({ where: { userId} })
			if(!profile) throw ApiError.BadRequest('Profile not found')

			if(profile.profileImg) { await deleteImageFromS3(profile.profileImg) }

			const newImageKey = await uploadImageToS3(file)
			const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newImageKey}`
			await prisma.profile.update({
				where: {userId},
				data : {profileImg:  url}
			})
            return url
    }

    async getOne (userId: number) {
        const profile = await this.findProfileByUserId(userId)
        if (!profile) throw ApiError.BadRequest("Profile for this user does not exist")
        return {
            firstName: profile.firstName,
            lastName: profile.lastName,
            bio: profile.bio,
            profileImg: profile.profileImg,
        }
    }

    async createOne (userId: number, data: CreateProfileBody) {
            const existedProfile = await this.findProfileByUserId(userId)
            if(existedProfile) throw ApiError.BadRequest('Profile for this user already exist')

            const newProfile = await prisma.profile.create({
                data: {
                    ...data,
                    userId
                }  
            })
            return {
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                bio: newProfile.bio,
                profileImg: newProfile.profileImg,
            }
    }

    async updateOne (userId: number, data: UpdateProfileBody) {
            const existedProfile = await this.findProfileByUserId(userId)
            if(!existedProfile) throw ApiError.BadRequest('Profile for this user already exist')

            const updatedProfile = await prisma.profile.update({
                where: {userId},
                data: { ...data }  
            })
            return {
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                bio: updatedProfile.bio,
                profileImg: updatedProfile.profileImg,
            }
    }
}

export default new ProfileService();
