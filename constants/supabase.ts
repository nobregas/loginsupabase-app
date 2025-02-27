import dotenv from "dotenv";

dotenv.config();

export const URL = process.env.SUPABASE_URL;
export const KEY = process.env.SUPABASE_KEY;
