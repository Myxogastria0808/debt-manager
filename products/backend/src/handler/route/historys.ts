import { Bindings } from '../..';
import { add_history, get_historys } from '../../application/historys';
import { Hono } from 'hono';
import { historys } from '../../db/schema';

export const history = new Hono<{ Bindings: Bindings }>();

history.post('/', async (c) => {
  const result = await add_history(c.env, await c.req.json<typeof historys.$inferSelect>());
  return c.json(result);
});

history.get('/', async (c) => {
  const result = await get_historys(c.env);
  return c.json(result);
});
