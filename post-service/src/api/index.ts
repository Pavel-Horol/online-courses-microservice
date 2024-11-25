import axios from "axios";

export const $notify = axios.create({
    baseURL: process.env.NOTIFY_SERVICE
})
