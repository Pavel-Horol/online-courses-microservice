import { Router } from 'express';
import { validateData } from '../middleware/validation-middleware';
import { loginSchema, registrationSchema } from '../schemas/auth-schemas';
import authController from '../controller/auth-controller';

const router = Router();

router.post('/login', validateData(loginSchema), authController.login);
router.post('/registration', validateData(registrationSchema), authController.registration);
router.post('/refresh', authController.refresh);
router.post('/refreshWithDb', authController.refreshWithDb);

router.get('/healthcheck', (_, res, _1) => {
	res.status(200).send();
});

export default router;

