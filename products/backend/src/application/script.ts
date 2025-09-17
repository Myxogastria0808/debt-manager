import { insert_usersdb } from '../infrastructure/insert';
import { Bindings } from '..';

export const add_user = async (
  env: Bindings,
  req_param: { id: number; name: string; email: string; password: string }
) => {
  const user = {
    name: req_param.name,
    email: req_param.email,
    password: req_param.password,
  };

  return await insert_usersdb(env, user);
};
