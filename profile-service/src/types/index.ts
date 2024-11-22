export interface JwtDecoded {
	payload: UserPayload;
	iat: number;
	exp: number;
}

export interface UserPayload {
	id: number;
}

export interface CreateProfileBody {
	firstName: string
	lastName: string
	bio?: string
}

export interface UpdateProfileBody {
	firstName?: string
	lastName?: string
	bio?: string
}