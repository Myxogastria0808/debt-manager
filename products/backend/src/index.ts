import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { historys } from './handler/route/historys';
import { Bindings } from 'hono/types';

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  '/*',
  cors({
    origin: ['http://localhost:5173', 'https://debt-manager.yukiosada.work'],
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'DELETE'],
    exposeHeaders: ['Content-Type'],
  })
);

app.route('/historys', historys);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
