import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const historys = sqliteTable(
  'historys',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    from: text('from').notNull(),
    to: text('to').notNull(),
    amount: integer('amount', { mode: 'number' }).notNull(),
  },
  () => []
);
