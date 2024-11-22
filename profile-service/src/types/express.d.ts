import { JwtDecoded, UserPayload } from './';
declare global {
	namespace Express {
		interface Request {
			user?: UserPayload;
		}
	}
}
