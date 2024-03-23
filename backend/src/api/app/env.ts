import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

// Define all the environment variables here with proper types and defaults (if required)
export const envVar = cleanEnv(process.env, {
  PORT: num(),
  EMAIL_FROM: str(),
  EMAIL_PASSWORD: str(),
  JSON_SECRET_KEY: str(),
  DB_PATH: str(),
});
