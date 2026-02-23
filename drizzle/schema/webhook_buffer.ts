import { relations }                        from 'drizzle-orm';
import {
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp
}                                           from 'drizzle-orm/pg-core';
import { jsonb }                            from 'drizzle-orm/pg-core/columns/jsonb';
import { table_users_wallets_transactions } from './users_wallets_transactions';



export const webhook_status = [ 'CONSUMED', 'UNPROCESSED' ] as const

export const table_webhook_buffer = pgTable('webhook_buffer', {
	webhook_id       : text().notNull(),
	webhook_content  : jsonb().notNull(),
	webhook_timestamp: integer().notNull(),
	webhook_status   : text({ enum: webhook_status }).notNull().default(
		'UNPROCESSED'),
	created_at       : timestamp({
									 mode     : 'date',
									 precision: 6
								 })
		.notNull()
		.defaultNow(),
	updated_at       : timestamp({
									 mode     : 'date',
									 precision: 6
								 })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	return {
		pk: primaryKey({
						   name   : 'webhook_id_pk',
						   columns: [ table.webhook_id ]
					   }),
	}
})

export const relations_webhook = relations(table_webhook_buffer, ({ one }) => {
	return {
		transaction: one(table_users_wallets_transactions, {
			fields    : [ table_webhook_buffer.webhook_id ],
			references: [ table_users_wallets_transactions.transaction_webhook_id ]
		})
	}
})
