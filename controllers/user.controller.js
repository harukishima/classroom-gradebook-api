import crypto from 'crypto';
import User, { isEmailExisted } from '../models/User.model.js';
import { emailValidation } from '../helpers/verify.helper.js';

export const userRegistaion = async (req, res) => {
  // if (!emailValidation(req.body.email)) {
  //   res.status(400).json({ error: 'invalid email' });
  //   return;
  // }
  // if (await isEmailExisted(req.body.email)) {
  //   res.status(400).json({ error: 'email is already exist' });
  //   return;
  // }
  // let salt = crypto.randomBytes(16).toString('base64');
  // let hash = crypto
  //   .createHmac('sha512', salt)
  //   .update(req.body.password)
  //   .digest('base64');
  // req.body.password = salt + '$' + hash;
  //req.body.permissionLevel = 1;
  let user = await User.create(req.body);
  user = user.toJSON();
  delete user.password;
  res.status(201).json(user);
};

export const profile = async (req, res) => {
  let user = await User.findById(req.jwt.data._id).select('-password');
  res.status(200).json(user);
};
