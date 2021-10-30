import jwt from 'jsonwebtoken';

export const generateToken = (data, sercetKey, tokenLife) => {
  return jwt.sign({ data }, sercetKey, {
    algorithm: 'HS256',
    expiresIn: tokenLife,
  });
};

export const verifyToken = (token, sercetKey) => {
  return jwt.verify(token, sercetKey);
};
