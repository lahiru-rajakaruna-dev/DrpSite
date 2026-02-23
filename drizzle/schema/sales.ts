import { relations }            from 'drizzle-orm';
import {
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
import { table_products }       from './products';
import { table_users }          from './users';
import { table_webhook_buffer } from './webhook_buffer';



export const table_sales = pgTable('sales', {
	sale_id        : text().notNull(),
	sale_webhook_id: text().notNull(),
	sale_owner_id  : text().notNull(),
	sale_product_id: text().notNull(),
	sale_value     : text().notNull(),
	created_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.defaultNow(),
	updated_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	return {
		pk                 : primaryKey(
			{
				name   : 'pk',
				columns: [ table.sale_id ]
			}
		),
		sale_webhook_id_fk : foreignKey({
											name          : 'sale_webhook_fk',
											columns       : [ table.sale_webhook_id ],
											foreignColumns: [ table_webhook_buffer.webhook_id ]
										}),
		sale_owner_id_fk   : foreignKey({
											name          : 'sale_owner_id_fk',
											columns       : [ table.sale_owner_id ],
											foreignColumns: [ table_users.user_id ],
										}),
		sale_product_id_fk : foreignKey({
											name          : 'sale_product_id_fk',
											columns       : [ table.sale_product_id ],
											foreignColumns: [ table_products.product_id ]
										}),
		sale_owner_id_idx  : index('sale_owner_id_idx').on(table.sale_owner_id),
		sale_product_id_idx: index('sale_product_id_idx')
			.on(table.sale_product_id),
		sale_webhook_id_idx: index('sale_webhook_id_idx')
			.on(table.sale_webhook_id)
	}
})

export const relations_sale = relations(table_sales, ({ one }) => ({
	owner  : one(table_users, {
		fields    : [ table_sales.sale_owner_id ],
		references: [ table_users.user_id ]
	}),
	product: one(table_products, {
		fields    : [ table_sales.sale_product_id ],
		references: [ table_products.product_id ]
	}),
	webhook: one(table_webhook_buffer, {
		fields    : [ table_sales.sale_webhook_id ],
		references: [ table_webhook_buffer.webhook_id ]
	})
}))

export const SelectSaleSchema = createSelectSchema(table_sales)
export const UpdateSaleSchema = createUpdateSchema(table_sales)
export const InsertSaleSchema = createInsertSchema(table_sales)
