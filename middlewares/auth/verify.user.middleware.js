import User from '../../models/User.model.js';
import crypto from 'crypto';

export const isPasswordAndUserMatch = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(404).json({ error: "User's not exist" });
    } else {
      let passwordFields = user.password.split('$');
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac('sha512', salt)
        .update(req.body.password)
        .digest('base64');
      if (hash === passwordFields[1]) {
        req.body = {
          _id: user._id,
          email: user.email,
          permissionLevel: user.permissionLevel,
          name: user.name,
        };
        req.user = user;
        return next();
      } else {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
    }
  });
};
