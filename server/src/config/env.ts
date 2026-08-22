import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  jwtExpiresIn: '15m',
  jwtRefreshExpiresIn: '7d',
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  }
};
