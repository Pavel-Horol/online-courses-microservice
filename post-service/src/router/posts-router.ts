import { Router } from "express";
import postsController from "../controller/posts-controller";
import authMiddleware from "../middleware/auth-middleware";

const router = Router()

router.post('/', authMiddleware,postsController.create)
router.get('/all', authMiddleware,postsController.getAll)


export default router