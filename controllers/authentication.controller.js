import config from '../config/index.js';
import { generateToken, verifyToken } from '../helpers/jwt.helper.js';

export const logIn = (req, res) => {
  try {
    let token = generateToken(
      req.body,
      config.jwtSecret,
      parseInt(config.tokenLife)
    );
    let refresh_token = generateToken(
      req.body,
      config.refreshSecret,
      config.refreshLife
    );
    res.status(201).send({ accessToken: token, refreshToken: refresh_token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

export const refreshToken = (req, res) => {
  if (req.body.refreshToken) {
    try {
      const decoded = verifyToken(req.body.refreshToken, config.refreshSecret);
      const accessToken = generateToken(
        decoded.data,
        config.jwtSecret,
        config.tokenLife
      );
      res.status(200).json({ accessToken: accessToken });
      return;
    } catch (err) {
      res.status(403).json({ errors: err, message: 'Invalid token' });
    }
  } else {
    res.status(403).json({ errors: err, message: 'No token provided' });
  }
};
