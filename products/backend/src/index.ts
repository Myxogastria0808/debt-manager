import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { users } from './db/schema';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

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

/*****************************************
 * create users
 *****************************************/
app.post('/users', async (c) => {
  const params = await c.req.json<typeof users.$inferSelect>();
  const db = drizzle(c.env.DB);

  const result = await db.insert(users).values({
    name: params.name,
    email: params.email,
    password: params.password,
  });

  return c.json(result);
});

export default app;
