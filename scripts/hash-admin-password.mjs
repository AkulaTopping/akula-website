import crypto from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error('Usage: node scripts/hash-admin-password.mjs "<password>" (min 8 chars)');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const derived = crypto.scryptSync(password, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${derived}`);
