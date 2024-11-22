export interface LoginResponse {
    user: {
        id: number
    },
    accessToken: string,
    refreshToken: string,
}

export interface LoginRequest {

}

export interface RegistrationResponse {
    user: {
        id: number
    },
    accessToken: string,
    refreshToken: string,

}

export interface RegistrationRequest {

}