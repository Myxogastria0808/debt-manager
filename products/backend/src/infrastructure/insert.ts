import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { users } from '../db/schema';
import { Bindings } from '..';

export const insert_usersdb = async (
  env: Bindings,
  user: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const db = drizzle(env.DB);

  return await db.insert(users).values(user);
};
