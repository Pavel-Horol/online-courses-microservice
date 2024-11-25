import prisma from "../prisma"

class PostsService {
    async create(data: any, userId: number) {
        const createdPost = await prisma.post.create({
            data: {
                ...data,
                userId
            },

        })
        return createdPost
    }

    async getAll(userId:number) {
        const usersPosts = await prisma.post.findMany({ where: { userId } })
        return usersPosts
    }
}

export default new PostsService()