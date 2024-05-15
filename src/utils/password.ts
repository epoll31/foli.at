import crypto from "crypto";

// Generate a random salt
function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

// Hash the password with the salt
export function hashPassword(password: string) {
  const salt = generateSalt();
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
}

// Verify the password
export function verifyPassword(password: string, hash: string, salt: string) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === hashedPassword;
}
