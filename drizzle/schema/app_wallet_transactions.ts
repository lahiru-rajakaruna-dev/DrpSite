import { relations }        from 'drizzle-orm';
import {
	decimal,
	foreignKey,
	index,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp
}                           from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                           from 'drizzle-zod';
import { table_app_wallet } from './app_wallet';



export const transaction_flow = [ 'DEBIT', 'CREDIT' ] as const

export const table_app_wallet_transactions = pgTable(
	'app_wallets_transactions',
	{
		transaction_id                    : text().notNull(),
		transaction_wallet_id             : text().notNull(),
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
			pk                      : primaryKey({
													 name   : 'transaction_primary_key',
													 columns: [ table.transaction_id ]
												 }),
			transaction_wallet_id_fk: foreignKey({
													 name          : 'transaction_wallet_id_fk',
													 columns       : [ table.transaction_wallet_id ],
													 foreignColumns: [ table_app_wallet.app_wallet_id ]
												 }),
			transaction_wallet_idx  : index('transaction_wallet_id_idx')
				.on(table.transaction_wallet_id),
			
		}
	}
)

export const relations_app_wallet_transaction = relations(
	table_app_wallet_transactions,
	({ one }) => {
		return {
			wallet: one(table_app_wallet, {
				fields    : [ table_app_wallet_transactions.transaction_wallet_id ],
				references: [ table_app_wallet.app_wallet_id ]
			})
		}
	}
)

export const SelectAppWalletTransaction  = createSelectSchema(
	table_app_wallet_transactions)
export const UpdatesAppWalletTransaction = createUpdateSchema(
	table_app_wallet_transactions)
export const InsertAppWalletTransaction  = createInsertSchema(
	table_app_wallet_transactions)
