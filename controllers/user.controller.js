import crypto from 'crypto';
import User, { getFullUser, getUserNameOnly } from '../models/User.model.js';
import config from '../config/index.js';

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

export const getUser = async (req, res) => {
  let user = await getFullUser(req.params.id);
  if (req.jwt) {
    if (req.jwt.data.permissionLevel & config.permission.CLASSROOM_MANAGER) {
      return res.status(200).json(user);
    } else if (req.jwt.data._id === user._id.toString()) {
      return res.status(200).json(user);
    }
  }
  return res.status(200).json({
    _id: user._id,
    name: user.name,
  });
};
