import dotenv from "dotenv";
dotenv.config();

const _required = (key) => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env variable: ${key}`);
  return val;
};

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: _required("MONGODB_URI"),
  jwt: {
    accessSecret: _required("JWT_ACCESS_SECRET"),
    refreshSecret: _required("JWT_REFRESH_SECRET"),
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  },
  cloudinary: {
    cloudName: _required("CLOUDINARY_CLOUD_NAME"),
    apiKey: _required("CLOUDINARY_API_KEY"),
    apiSecret: _required("CLOUDINARY_API_SECRET"),
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    notifyEmail: process.env.CONTACT_NOTIFY_EMAIL,
  },
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  contactRateLimit: {
    windowMs: Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 900000,
    max: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  },
};