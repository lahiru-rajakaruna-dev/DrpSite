import { relations }            from 'drizzle-orm';
import {
	decimal,
	foreignKey,
	index,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp
}                               from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                               from 'drizzle-zod';
import { transaction_flow }     from './app_wallet_transactions';
import { table_users }          from './users';
import { table_users_wallets }  from './users_wallets';
import { table_webhook_buffer } from './webhook_buffer';



export const table_users_wallets_transactions = pgTable(
	'users_wallets_transactions',
	{
		transaction_id                    : text().notNull(),
		transaction_wallet_id             : text().notNull(),
		transaction_user_id               : text().notNull(),
		transaction_webhook_id            : text().notNull(),
		transaction_absolute_value        : decimal({ mode: 'number' })
			.notNull(),
		transaction_flow                  : text({ enum: transaction_flow })
			.notNull(),
		transaction_running_wallet_balance: decimal({ mode: 'number' })
			.notNull(),
		created_at                        : timestamp({
														  mode     : 'date',
														  precision: 6
													  })
			.notNull()
			.defaultNow(),
		updated_at                        : timestamp({
														  mode     : 'date',
														  precision: 6
													  })
			.notNull()
			.$onUpdate(() => new Date(Date.now()))
	},
	(table) => {
		return {
			pk                         : primaryKey({
														name   : 'transaction_primary_key',
														columns: [ table.transaction_id ]
													}),
			transaction_wallet_id_fk   : foreignKey({
														name          : 'transaction_wallet_id_fk',
														columns       : [ table.transaction_wallet_id ],
														foreignColumns: [ table_users_wallets.user_wallet_id ]
													}),
			transaction_user_id_fk     : foreignKey({
														name          : 'transaction_user_id_fk',
														columns       : [ table.transaction_user_id ],
														foreignColumns: [ table_users.user_id ]
													}),
			transaction_webhook_id_fk  : foreignKey({
														name          : 'transaction_webhook_id_fk',
														columns       : [ table.transaction_webhook_id ],
														foreignColumns: [ table_webhook_buffer.webhook_id ]
													}),
			transaction_user_id_idx    : index('transaction_user_id_idx')
				.on(table.transaction_user_id),
			transaction_user_wallet_idx: index('transaction_user_wallet_id_idx')
				.on(table.transaction_wallet_id),
			
		}
	}
)

export const relations_user_wallet_transaction = relations(
	table_users_wallets_transactions,
	({ one }) => {
		return {
			user       : one(table_users, {
				fields    : [ table_users_wallets_transactions.transaction_user_id ],
				references: [ table_users.user_id ]
			}),
			wallet     : one(table_users_wallets, {
				fields    : [ table_users_wallets_transactions.transaction_wallet_id ],
				references: [ table_users_wallets.user_wallet_id ]
			}),
			transaction: one(table_webhook_buffer, {
				fields    : [ table_users_wallets_transactions.transaction_webhook_id ],
				references: [ table_webhook_buffer.webhook_id ]
			})
		}
	}
)

export const SelectUserWalletTransaction = createSelectSchema(
	table_users_wallets_transactions)
export const UpdateUserWalletTransaction = createUpdateSchema(
	table_users_wallets_transactions)
export const InsertUserWalletTransaction = createInsertSchema(
	table_users_wallets_transactions)
