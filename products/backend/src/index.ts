import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { users } from './db/schema';
import { user } from './handler/route/script';
import { cors } from 'hono/cors';

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  '/*',
  cors({
    origin: ['*'],
    allowHeaders: ['Content-Type'],
    allowMethods: ['*'],
    exposeHeaders: ['Content-Type'],
  })
);

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
