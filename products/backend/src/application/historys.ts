import { insert_historydb, select_historydb_all } from '../infrastructure/historys';
import { Bindings } from '..';

export const add_history = async (
  env: Bindings,
  req_param: { id: number; from: string; to: string; amount: number }
) => {
  const history = {
    from: req_param.from,
    to: req_param.to,
    amount: req_param.amount,
  };

  return await insert_historydb(env, history);
};

export const get_historys = async (env: Bindings) => {
  return await select_historydb_all(env);
};
