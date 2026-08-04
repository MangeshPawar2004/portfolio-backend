import mongoose from "mongoose";
import { User } from "../src/models/User.model.js";
import { env } from "../src/config/env.js";

await mongoose.connect(env.mongoUri, { dbName: "portfolio" });

const exists = await User.findOne({ email: "admin@portfolio.com" });
if (exists) {
  console.log("Admin already exists");
  process.exit(0);
}

await User.create({
  name:     "Mangesh",
  email:    "admin@portfolio.com",
  password: "Admin@123456",
  role:     "admin",
});

console.log("✅ Admin created — email: admin@portfolio.com | password: Admin@123456");
console.log("⚠️  Change your password immediately after first login!");
process.exit(0);