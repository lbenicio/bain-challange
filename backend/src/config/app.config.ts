import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  name: process.env.NAME || 'distance api',
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendURL: process.env.FRONTEND_URL || 'http://localhost:3000',
  versioning: 1,
}));
