import { Bindings } from '../..';
import { get_users } from '../../application/getUser';
import { Hono } from 'hono';
import { users } from '../../db/schema';

export const user = new Hono<{ Bindings: Bindings }>();

/*****************************************
 * get users
 *****************************************/
user.get('/users', async (c) => {
  const result = await get_users(c.env);
  return c.json(result);
});
