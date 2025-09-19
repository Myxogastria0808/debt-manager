import { Bindings } from '../../domain/script';
import { addHistory, getHistorys, removeHistorysById } from '../../application/historys';
import { Hono } from 'hono';
import { historys as historysDB } from '../../db/schema';

export const historys = new Hono<{ Bindings: Bindings }>();

historys.post('/', async (c) => {
  const result = await addHistory(c.env, await c.req.json<typeof historysDB.$inferSelect>());
  return c.json(result);
});

historys.get('/', async (c) => {
  const result = await getHistorys(c.env);
  return c.json(result);
});

historys.delete('/', async (c) => {
  const result = await removeHistorysById(c.env, await c.req.json<typeof historysDB.$inferSelect>());
  return c.json(result);
});
