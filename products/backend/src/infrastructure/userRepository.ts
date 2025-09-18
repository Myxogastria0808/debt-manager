import { drizzle } from 'drizzle-orm/d1';
import { users } from '../db/schema';
import { Bindings } from '..';

// ユーザー参照（全件取得）
export const select_users = async (env: Bindings) => {
  const db = drizzle(env.DB);
  return await db.select().from(users).all();
};
