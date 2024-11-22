import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { authServer, profileServer } from '../api/auth-server';
import { setRefreshCookie } from '../utils/cookie-util';


class GetawayController {

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body)
				return next(ApiError.BadRequest('No login data was provided'));
			const response = await authServer.login(req.body) 	
			setRefreshCookie(res, response.data.refreshToken)
			
            res.status(response.status).json({user: response.data.user, accessToken: response.data.accessToken});	
		} catch (error) {
			next(error);
		}
	}

	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body)
				return next(ApiError.BadRequest('No registration data was provided'));

			const {status, data} = await authServer.registration(req.body) 	
			await profileServer.create({firstName: req.body.firstName, lastName: req.body.lastName}, data.accessToken) 	
						 
            res.status(status).json({user: data.user, accessToken: data.accessToken});	
		} catch (error) {
			next(error);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {

		try {
			const { refreshToken } = req.cookies
			if (!refreshToken) { return next(ApiError.UnauthorizedError) }

			const {data, status} = await authServer.refresh(refreshToken)
			setRefreshCookie(res, data.refreshToken)
            res.status(status).json({user: data.user, accessToken: data.accessToken});	
		} catch (error) {
			next(error);
		}
	}
}

export default new GetawayController();
