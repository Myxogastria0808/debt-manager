import app from '../..';
import { users } from '../../db/schema';
import { add_user } from '../../application/script';

/*****************************************
 * create users
 *****************************************/
app.post('/users', async (c) => {
  const result = await add_user(c.env, await c.req.json<typeof users.$inferSelect>());
  return c.json(result);
});
