import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import profileService from '../services/profile-service';

class ProfileController {
	async deleteOne(req: Request, res: Response, next: NextFunction) {
		try {

		} catch (error) {
			next(error);
		}
	}

	async updateOne(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id
			if(!userId) throw ApiError.UnauthorizedError()
			if (!req.body) throw ApiError.BadRequest('No update data was provided')

			const updatedProfile = await profileService.updateOne(userId, req.body)

			res.json(updatedProfile)
		} catch (error) {
			next(error);
		}
	}

	async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			console.log('creating... for');
			const userId = req.user?.id
			if(!userId) throw ApiError.UnauthorizedError()
			if (!req.body) throw ApiError.BadRequest('No create data was provided')
			
			const profileData = await profileService.createOne(userId, req.body)
			console.log(profileData)
			res.status(201).json(profileData)
		} catch (error) {
			console.log(error);
			
			next(error);
		}
	}

	async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id
			if(!userId) throw ApiError.UnauthorizedError()
			
			const profileData = await profileService.getOne(userId)
			res.json(profileData)	
		} catch (error) {
			next(error);
		}
	}

	async uploadPhoto(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id	
			if (!userId) throw ApiError.UnauthorizedError()
			if (!req.file) throw ApiError.BadRequest('No file was provided')
				
			const url = await profileService.uploadPhoto(userId, req.file)

			res.send({message: "Profile image update successfully!", url })
		} catch (error) {
			next(error);
		}
	}

}

export default new ProfileController();
