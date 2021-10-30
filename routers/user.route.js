import express from 'express';
import * as controller from '../controllers/user.controller.js';
import {
  minimumPermissionLevelRequired,
  register,
  validJWTNeeded,
} from '../middlewares/auth/auth.middleware.js';
import { addNormalUser } from '../middlewares/user.middleware.js';
import config from '../config/index.js';

const router = express.Router();

router.get(
  '/',
  validJWTNeeded,
  minimumPermissionLevelRequired(config.permission.NORMAL_USER),
  controller.profile
);
router.post('/register', addNormalUser, register, controller.userRegistaion);

export default router;
