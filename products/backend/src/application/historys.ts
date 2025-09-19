import { insertHistoryDB, selectHistoryDBAll, deleteHistoryDBById } from '../infrastructure/historys';
import { Bindings } from '../domain/script';

export const addHistory = async (
  env: Bindings,
  req_param: { id: number; from: string; to: string; amount: number }
) => {
  const history = {
    from: req_param.from,
    to: req_param.to,
    amount: req_param.amount,
  };

  return await insertHistoryDB(env, history);
};

export const getHistorys = async (env: Bindings) => {
  return await selectHistoryDBAll(env);
};

export const removeHistorysById = async (
  env: Bindings,
  req_param: { id: number; from: string; to: string; amount: number }
) => {
  return await deleteHistoryDBById(env, req_param.id);
};
