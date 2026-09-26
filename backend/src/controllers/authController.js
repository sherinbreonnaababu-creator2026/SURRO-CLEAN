import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

function tokenFor(user) {
  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export async function register(req, res) {
  const { name, email, password, phone, ward } = req.body;
  if (!name || typeof email !== 'string' || !password || password.length < 8) return res.status(400).json({ message: 'Name, a valid email and a password of at least 8 characters are required' });
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) return res.status(409).json({ message: 'Email is already registered' });
  const user = await User.create({ name, email: normalizedEmail, phone, ward, password: await bcrypt.hash(password, 12), role: 'STUDENT' });
  res.status(201).json({ token: tokenFor(user), user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (typeof email !== 'string') return res.status(401).json({ message: 'Invalid email or password' });
  const normalizedEmail = email.trim().toLowerCase();
  let user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!password) {
    if (!/^[a-z0-9._%+-]+@gmail\.com$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Use a Gmail address for email-only demo access' });
    }
    if (user && !user.emailOnlyDemo) {
      return res.status(401).json({ message: 'This account requires its password' });
    }
    if (!user) {
      const displayName = normalizedEmail.split('@')[0].replace(/[._+-]+/g, ' ').trim() || 'Gmail User';
      user = await User.create({
        name: displayName,
        email: normalizedEmail,
        password: await bcrypt.hash(randomBytes(32).toString('hex'), 12),
        emailOnlyDemo: true,
        role: 'STUDENT'
      });
    }
  } else if (typeof password !== 'string' || !user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  user.password = undefined;
  res.json({ token: tokenFor(user), user });
}

export function me(req, res) {
  res.json({ user: req.user });
}