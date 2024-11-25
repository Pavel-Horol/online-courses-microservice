import { ApiError } from '../exceptions/api-error';
import jwt from 'jsonwebtoken';
import { JwtDecoded } from '../types';
import  { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) return next(ApiError.UnauthorizedError())

		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!, {
			ignoreExpiration: false,
		}) as JwtDecoded;

		if (!userData) return next(ApiError.UnauthorizedError())
		req.user = userData.payload;
		next();
	} catch (error) {
		return next(ApiError.UnauthorizedError())
	}
};

export default authMiddleware;
