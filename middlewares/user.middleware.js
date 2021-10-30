import config from '../config/index.js';

export const addNormalUser = (req, res, next) => {
  req.body.permissionLevel = config.permission.NORMAL_USER;
  next();
};
