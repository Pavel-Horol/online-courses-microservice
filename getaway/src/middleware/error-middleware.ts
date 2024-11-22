import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import axios from 'axios';

export default function errorMiddleware(
	err: Error | ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (axios.isAxiosError(err) && err.response) {
		const { status, data } = err.response;
		return res.status(status).json({
			message: data.message || 'An error occurred',
			errors: data.errors || [],
		});
	}
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: 'Unexpected error occurred' });
}
