import mongoose from "mongoose";
import { User } from "../src/models/User.model.js";
import { env } from "../src/config/env.js";

await mongoose.connect(env.mongoUri, { dbName: "portfolio" });

const exists = await User.findOne({ email: "mangeshpawarmrp2004@gmail.com" });
if (exists) {
  console.log("Admin already exists");
  process.exit(0);
}

await User.create({
  name:     "Mangesh",
  email:    "mangeshpawarmrp2004@gmail.com",
  password: "MangeshP@7058",
  role:     "admin",
});

console.log("✅ Admin created — email: mangeshpawarmrp2004@gmail.com | password: MangeshP@7058");
console.log("⚠️  Change your password immediately after first login!");
process.exit(0);