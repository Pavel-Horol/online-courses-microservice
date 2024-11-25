import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error";
import postsService from "../service/posts-service";
import { $notify } from "../api";
import sendMessageToKafka from "../kafka";

class PostsController {
    async create(req: Request, res: Response, next: NextFunction) {
        try{ 
            const userId = req.user?.id
            const data = req.body
            if (!userId) throw ApiError.UnauthorizedError()
            
            const response = await postsService.create(data, userId)
            await sendMessageToKafka('PostCreated', {message:`New post: '${response.title}' was created` })
            res.json(response)
        }
        catch(error) {
            console.error(error)
            next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try{ 
            const userId = req.user?.id
            if (!userId) throw ApiError.UnauthorizedError()
            
            const response = await postsService.getAll(userId)
            res.json(response)
        } 
        catch(error) {
            console.error(error)
            next(error)
        }
    }
}

export default new PostsController()