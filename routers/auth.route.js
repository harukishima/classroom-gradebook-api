import express from 'express';
import * as controller from '../controllers/authentication.controller.js';
import { isPasswordAndUserMatch } from '../middlewares/auth/verify.user.middleware.js';

const router = express.Router();

router.post('/login', isPasswordAndUserMatch, controller.logIn);
router.post('/refresh', controller.refreshToken);

export default router;
