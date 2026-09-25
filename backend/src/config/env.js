import 'dotenv/config';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/surroclean';

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  frontendUrl: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@surroclean.local',
  adminPassword: process.env.ADMIN_PASSWORD,
  staffPassword: process.env.STAFF_PASSWORD,
  studentPassword: process.env.STUDENT_PASSWORD
};

if (!env.jwtSecret || env.jwtSecret.length < 32) throw new Error('JWT_SECRET must be set and at least 32 characters long');
if (!env.adminPassword || !env.staffPassword || !env.studentPassword) throw new Error('ADMIN_PASSWORD, STAFF_PASSWORD and STUDENT_PASSWORD must be set');
if (mongoUri.includes('<') || mongoUri.includes('>')) throw new Error('MONGODB_URI still contains a placeholder. Replace <db_username> with the MongoDB database user name.');