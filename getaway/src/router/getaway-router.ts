import { Router } from "express";
import { validateData } from "../middleware/validation-middleware";
import { loginSchema, registrationSchema } from "../schemas/auth-schema";
import getawayController from "../controller/getaway-controller";

const router = Router()

router.get("/healthcheck", (_, res) => {
    res.send("All working...")
})

router.post(
    '/auth/registration',
    validateData(registrationSchema),
    getawayController.registration
)

router.post(
    '/auth/login',
    validateData(loginSchema),
    getawayController.login
)

router.post(
    '/auth/refresh',
    getawayController.refresh
)

export default router