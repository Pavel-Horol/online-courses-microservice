import axios from "axios";
import { RegistrationDataPost } from "../types";

export const $auth = axios.create({
    baseURL: process.env.AUTH_URL,
})

export const $profile = axios.create({
    baseURL: process.env.PROFILE_URL,
})

class ProfileServer {
    async create (data: any, token: string) {
        return await $profile.post('/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } 
}

export const profileServer = new ProfileServer ()

class AuthServer {
    async refresh (refreshToken: string) {
        return await $auth.post('/refresh', {refreshToken}  )
    }

    async registration (data: RegistrationDataPost) {
        return await $auth.post('/registration', data) 
    }

    async login (data: RegistrationDataPost) {
        return await $auth.post('/login', data) 
    }
}

export const authServer = new AuthServer ()