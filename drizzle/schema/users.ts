import { relations }                        from 'drizzle-orm';
import {
	index,
	integer,
	pgTable,
	text,
	timestamp
}                                           from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                                           from 'drizzle-zod';
import { table_pages }                      from './pages';
import { table_products }                   from './products';
import { table_sales }                      from './sales';
import { table_users_wallets }              from './users_wallets';
import { table_users_wallets_transactions } from './users_wallets_transactions';



export const user_status = [ 'ACTIVE', 'DEACTIVATED', 'BANNED' ] as const

export const table_users = pgTable('users', {
	user_id        : text().notNull().primaryKey(),
	user_nic       : text().notNull(),
	user_first_name: text().notNull(),
	user_last_name : text().notNull(),
	user_status    : text({ enum: user_status }).notNull().default('ACTIVE'),
	created_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.defaultNow(),
	updated_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	{
		return {}
	}
})

export const relations_user = relations(table_users, ({ one, many }) => ({
	products    : many(table_products),
	sales       : many(table_sales),
	pages       : many(table_pages),
	transactions: many(table_users_wallets_transactions),
	wallet      : one(table_users_wallets, {
		fields    : [ table_users.user_id ],
		references: [ table_users_wallets.user_wallet_owner_id ]
	})
}))

export const SelectUserSchema = createSelectSchema(table_users)
export const UpdateUserSchema = createUpdateSchema(table_users)
export const InsertUserSchema = createInsertSchema(table_users)