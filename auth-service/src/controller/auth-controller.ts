import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import authService from '../service/auth-service';

class AuthController {
	async login(
		req: Request<{ email?: string; username?: string; password: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { email, username, password } = req.body;
			if (!email && !username)
				return next(
					ApiError.BadRequest('You need to provide email or username')
				);

			const userData = await authService.login({
				email,
				username,
				password,
			});
			res.status(200).json(userData);
		} catch (error) {
			next(error);
		}
	}

	async registration(
		req: Request<{ email: string; username: string; password: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { email, username, password } = req.body;
			const userData = await authService.registration({
				email,
				username,
				password,
			});
			res.status(200).json(userData);
		} catch (error) {
			next(error);
		}
	}

	async refreshWithDb(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.body
			if (!refreshToken) return next(ApiError.UnauthorizedError());

			const data = await authService.refreshWithDb(refreshToken);
			res.json(data);
		} catch (error) {
			next(error);
		}
	}
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.body
			if (!refreshToken) return next(ApiError.UnauthorizedError());

			const data = await authService.refresh(refreshToken);
			res.json(data);
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
