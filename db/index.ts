import { drizzle } from 'drizzle-orm/neon-http';

const db_url = process.env.DATABASE_URL || ""

export const db = drizzle(db_url);
