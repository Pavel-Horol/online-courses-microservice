import { CookieOptions, Response } from "express"

export const setCookie = (res: Response, name: string, value: string, options: object = {}) => {
    const defaultOptions = {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        ...options
    } as CookieOptions

    res.cookie(name, value, defaultOptions)
}

export const setRefreshCookie = (res: Response, value: string, options: object = {}) => {
    const defaultOptions = {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        ...options
    } as CookieOptions

    res.cookie('refreshToken', value, defaultOptions)
}