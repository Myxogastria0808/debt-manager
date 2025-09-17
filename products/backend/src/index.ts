import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { users } from './db/schema';
import { user } from './handler/route/script';

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route('/', user);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

/*****************************************
 * get users
 *****************************************/
app.get('/users', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users).all();
  return c.json(result);
});

export default app;
