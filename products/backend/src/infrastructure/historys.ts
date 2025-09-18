import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { historys } from '../db/schema';
import { Bindings } from '..';

export const insert_historydb = async (
  env: Bindings,
  history: {
    from: string;
    to: string;
    amount: number;
  }
) => {
  const db = drizzle(env.DB);

  return await db.insert(historys).values(history);
};

export const select_historydb_all = async (env: Bindings) => {
  const db = drizzle(env.DB);

  return await db.select().from(historys).all();
};
