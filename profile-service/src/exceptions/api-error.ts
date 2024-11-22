
export enum HTTPStatusCode {
	Ok = 200,
	Created = 201,
	Accepted = 202,
	NoContent = 204,
	PartialContent = 206,
	MultipleChoices = 300,
	MovedPermanently = 301,
	Found = 302,
	BadRequest = 400,
	Unauthorized = 401,
	PaymentRequired = 402,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	RequestTimeout = 408,
	Conflict = 409,
	Gone = 410,
	UnprocessableEntity = 422,
	TooManyRequests = 429,
	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504
}

export class ApiError extends Error {
	status: number;
	errors: any[];

	constructor(status: number, message: string, errors: any[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static BadRequest(message: string, errors: any[] = []) {
		return new ApiError(400, message, errors);
	}
	
	static NotFound(message: string, errors: any[] = []) {
		return new ApiError(404, message, errors);
	}
	
	static UnauthorizedError() {
		return new ApiError(401, 'User is not authorized');
	}

	static ForbiddenError() {
		return new ApiError(403, 'Access denied');
	}
	
	static InternalServerError(message: string = 'Internal server error') {
		return new ApiError(500, message);
	}
}
