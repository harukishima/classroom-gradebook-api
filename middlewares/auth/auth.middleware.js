import config from '../../config/index.js';
import crypto from 'crypto';
import { verifyToken } from '../../helpers/jwt.helper.js';
import { isEmailExisted } from '../../models/User.model.js';
import { emailValidation } from '../../helpers/verify.helper.js';

export const validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).json({ errors: ['Invalid header'] });
      } else {
        //req.jwt = jwt.verify(authorization[1], config.jwtSecret);
        req.jwt = verifyToken(authorization[1], config.jwtSecret);
        next();
      }
    } catch (err) {
      console.error(err);
      return res.status(403).json({ errors: ['JWT Forbidden'] });
    }
  } else {
    return res.status(401).json({ errors: ['Invalid header'] });
  }
};

export const minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.data.permissionLevel);
    //let user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).json({ errors: ['Permission forbidden'] });
    }
  };
};

export const register = async (req, res, next) => {
  if (!emailValidation(req.body.email)) {
    res.status(400).json({ error: 'invalid email' });
    return;
  }
  if (await isEmailExisted(req.body.email)) {
    res.status(400).json({ error: 'email is already exist' });
    return;
  }
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto
    .createHmac('sha512', salt)
    .update(req.body.password)
    .digest('base64');
  req.body.password = salt + '$' + hash;
  next();
};

export const optionalJWT = async (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        next();
      } else {
        //req.jwt = jwt.verify(authorization[1], config.jwtSecret);
        req.jwt = verifyToken(authorization[1], config.jwtSecret);
        next();
      }
    } catch (err) {
      //return res.status(403).json({ errors: ['JWT Forbidden'] });
    }
  }
  next();
};
