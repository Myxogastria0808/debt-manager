import {
  insertHistoryDB,
  selectHistoryDBAll,
  deleteHistoryDBById,
  selectHistoryDBByFromTo,
} from '../infrastructure/historys';
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
  const match_data = await selectHistoryDBByFromTo(env, history.from, history.to);
  if (match_data.length > 0) {
    deleteHistoryDBById(env, match_data[0].id);
    history.amount += match_data[0].amount;
  }
  const reverse_match_data = await selectHistoryDBByFromTo(env, history.to, history.from);
  if (reverse_match_data.length > 0) {
    deleteHistoryDBById(env, reverse_match_data[0].id);
    history.amount -= reverse_match_data[0].amount;
    if (history.amount < 0) {
      const temp = history.from;
      history.from = history.to;
      history.to = temp;
      history.amount = -history.amount;
    }
  }
  if (history.amount === 0) {
    return;
  }

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
