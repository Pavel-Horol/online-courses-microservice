import { Router } from 'express';
import authMiddleware from '../middlewares/auth-middleware';
import profileController from '../controllers/profile-controller';
import { upload } from '../bucket';
import { validateData } from '../middlewares/validation-middleware';
import { createProfileSchema, updateProfileSchema } from '../schemas/auth-schemas';

const router = Router();

router.get('/healthcheck',  authMiddleware,  (req, res) => { res.send(req.user); });

router.post(
	'/upload-photo', 
	authMiddleware, 
	upload.single('image'), 
	profileController.uploadPhoto
);

router.get(
	'/', 
	authMiddleware,
	profileController.getOne	
)
router.post(
	'/', 
	validateData(createProfileSchema),
	authMiddleware,
	profileController.createOne	
)

router.put(
	'/', 
	validateData(updateProfileSchema),
	authMiddleware,
	profileController.updateOne
)

router.delete(
	'/', 
	authMiddleware,
	profileController.deleteOne
)

export default router;
