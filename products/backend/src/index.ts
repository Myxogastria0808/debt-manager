import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { users } from './db/schema';
import { user } from './handler/route/script';
import { cors } from 'hono/cors';
import { user as getUser } from './handler/route/users';

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors());

app.route('/', user);
app.route('/', getUser);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
