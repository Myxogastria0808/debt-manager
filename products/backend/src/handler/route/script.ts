import { users } from '../../db/schema';
import { add_user } from '../../application/script';
import { Hono } from 'hono';
import { Bindings } from '../..';

export const user = new Hono<{ Bindings: Bindings }>();

/*****************************************
 * create users
 *****************************************/
user.post('/users', async (c) => {
  const result = await add_user(c.env, await c.req.json<typeof users.$inferSelect>());
  return c.json(result);
});
