import { relations }                     from 'drizzle-orm';
import {
	decimal,
	foreignKey,
	index,
	pgTable,
	primaryKey,
	text,
	timestamp
}                                        from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                                        from 'drizzle-zod';
import { table_app_wallet_transactions } from './app_wallet_transactions';
import { table_users }                   from './users';



export const table_app_wallet = pgTable('app_wallet', {
	app_wallet_id     : text().notNull(),
	app_wallet_balance: decimal({
									mode     : 'number',
									precision: 2
								}).notNull().default(0.00),
	created_at        : timestamp({
									  mode     : 'date',
									  precision: 6
								  })
		.notNull()
		.defaultNow(),
	updated_at        : timestamp({
									  mode     : 'date',
									  precision: 6
								  })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	return {
		pk: primaryKey({
						   name   : 'app_wallet_id_pk',
						   columns: [ table.app_wallet_id ],
					   }),
	}
})

export const relations_app_wallet = relations(
	table_app_wallet,
	({ many }) => {
		return {
			transactions: many(table_app_wallet_transactions)
		}
	}
)

export const SelectAppWalletSchema = createSelectSchema(table_app_wallet)
export const UpdateAppWalletSchema = createUpdateSchema(table_app_wallet)
export const InsertAppWalletSchema = createInsertSchema(table_app_wallet)
