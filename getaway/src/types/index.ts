export interface RegistrationDataPost {
    username: string
    email: string
    password: string
}

export interface LoginDataPost {
    username?: string
    email?: string
    password: string
}