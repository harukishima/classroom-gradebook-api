import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongourl: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
  permission: {
    NORMAL_USER: 1,
    ADMIN_USER: 1023,
    ADMIN: 512,
    CLASSROOM_MANAGER: 2,
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshSecret: process.env.REFRESH_SECRET || 'secret',
  tokenLife: process.env.TOKEN_LIFE || '3600',
  refreshLife: process.env.REFRESH_LIFE || '100000',
};

export default config;
