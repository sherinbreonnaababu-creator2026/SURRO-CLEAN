import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import operationRoutes from './routes/operationRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';
import { fleet } from './data/operationalData.js';

const app = express();
const allowedOrigins = env.frontendUrl.split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(async (_req, _res, next) => {
  await connectDatabase();
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'surroclean-backend', timestamp: new Date().toISOString() }));
app.get('/api/fleet', (req, res) => res.json({ trucks: fleet }));
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/operations', operationRoutes);
app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => console.log(`SurroClean API listening on http://127.0.0.1:${env.port}`));
  } catch (error) {
    console.error(`SurroClean API startup aborted: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.env.NODE_ENV !== 'test' && process.env.VERCEL !== '1') start();
export default app;