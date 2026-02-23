import { relations }                        from 'drizzle-orm';
import {
	decimal,
	foreignKey,
	index,
	pgTable,
	primaryKey,
	text,
	timestamp
}                                           from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                                           from 'drizzle-zod';
import { table_users }                      from './users';
import { table_users_wallets_transactions } from './users_wallets_transactions';



export const table_users_wallets = pgTable('users_wallets', {
	user_wallet_id      : text().notNull(),
	user_wallet_owner_id: text().notNull(),
	user_wallet_balance : decimal({
									  mode     : 'number',
									  precision: 2
								  }).notNull().default(0.00),
	created_at          : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.defaultNow(),
	updated_at          : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	return {
		pk                      : primaryKey({
												 name   : 'user_wallet_id_pk',
												 columns: [ table.user_wallet_id ],
											 }),
		user_wallet_owner_id_fk : foreignKey({
												 name          : 'user_wallet_owner_id_fk',
												 columns       : [ table.user_wallet_owner_id ],
												 foreignColumns: [ table_users.user_id ]
											 }),
		user_wallet_owner_id_idx: index('user_wallet_owner_id_idx')
			.on(table.user_wallet_owner_id),
	}
})

export const relations_user_wallet = relations(
	table_users_wallets,
	({ one, many }) => {
		return {
			transactions: many(table_users_wallets_transactions),
			owner       : one(table_users, {
				fields    : [ table_users_wallets.user_wallet_id ],
				references: [ table_users.user_id ]
			})
		}
	}
)

export const SelectUserWalletSchema = createSelectSchema(table_users_wallets)
export const UpdateUserWalletSchema = createUpdateSchema(table_users_wallets)
export const InsertUserWalletSchema = createInsertSchema(table_users_wallets)
