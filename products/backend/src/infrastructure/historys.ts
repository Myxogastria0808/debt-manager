import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { historys } from '../db/schema';
import { Bindings } from '../domain/script';
import { eq } from 'drizzle-orm';

export const insertHistoryDB = async (
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

export const selectHistoryDBAll = async (env: Bindings) => {
  const db = drizzle(env.DB);

  return await db.select().from(historys).all();
};

export const deleteHistoryDBById = async (env: Bindings, id: number) => {
  const db = drizzle(env.DB);

  return await db.delete(historys).where(eq(historys.id, id));
};
