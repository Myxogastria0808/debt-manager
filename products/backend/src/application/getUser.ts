import { select_users } from '../infrastructure/userRepository';
import { Bindings } from '..';

// ユーザー取得ユースケース
export const get_users = async (env: Bindings) => {
  return await select_users(env);
};
