import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { history } from './handler/route/historys';

export type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.route('/historys', history);

app.use(
  '/*',
  cors({
    origin: ['http://localhost:5173'],
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'DELETE'],
    exposeHeaders: ['Content-Type'],
  })
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
