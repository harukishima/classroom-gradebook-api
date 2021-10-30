import express from 'express';
import config from '../config/index.js';

import * as controller from '../controllers/class.controller.js';
import {
  minimumPermissionLevelRequired,
  validJWTNeeded,
} from '../middlewares/auth/auth.middleware.js';

const router = express.Router();

router.get('/', controller.getAllClassroom);
router.post(
  '/',
  validJWTNeeded,
  minimumPermissionLevelRequired(config.permission.NORMAL_USER),
  controller.createClass
);
router.get('/:id', controller.getClass);
router.delete(
  '/:id',
  validJWTNeeded,
  minimumPermissionLevelRequired(config.permission.NORMAL_USER),
  controller.removeClass
);
router.patch(
  '/:id',
  validJWTNeeded,
  minimumPermissionLevelRequired(config.permission.NORMAL_USER),
  controller.patchClass
);

export default router;
