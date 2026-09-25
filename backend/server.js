const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET || "surroclean-demo-secret";

// Demo users
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@surroclean.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: 2,
    name: "Student User",
    email: "student@surroclean.com",
    password: "student123",
    role: "STUDENT"
  },
  {
    id: 3,
    name: "Cleaning Staff",
    email: "staff@surroclean.com",
    password: "staff123",
    role: "CLEANING_STAFF"
  }
];

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Get current user
app.get("/api/auth/me", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Dashboard
app.get("/api/dashboard/overview", authenticate, (req, res) => {
  res.json({
    bins: [],
    trucks: [],
    grievances: [],
    facilities: [],
    tasks: []
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "SurroClean backend is running"
  });
});

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

app.listen(PORT, () => {
  console.log(`SurroClean backend running on http://127.0.0.1:${PORT}`);
});