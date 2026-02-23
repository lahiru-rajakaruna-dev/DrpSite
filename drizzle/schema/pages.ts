import { relations }      from 'drizzle-orm';
import {
	foreignKey,
	index,
	pgTable,
	primaryKey,
	text,
	timestamp
}                         from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                         from 'drizzle-zod';
import { table_products } from './products';
import { table_users }    from './users';



export const page_status = [ 'DRAFT', 'DEACTIVATED', 'ACTIVE' ] as const

export const table_pages = pgTable('pages', {
	page_id        : text().notNull(),
	page_content_id: text().notNull(),
	page_owner_id  : text().notNull(),
	page_status    : text({ enum: page_status })
		.notNull(),
	created_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.defaultNow(),
	updated_at     : timestamp({ mode: 'date', precision: 6 })
		.notNull()
		.$onUpdate(() => new Date(Date.now()))
}, (table) => {
	return {
		pk                 : primaryKey({
											name   : 'primary_key',
											columns: [ table.page_id ]
										}),
		page_owner_id_fk   : foreignKey({
											name          : 'page_owner_id_fk',
											columns       : [ table.page_owner_id ],
											foreignColumns: [ table_users.user_id ]
										}),
		page_owner_id_idx  : index('page_owner_id_idx').on(table.page_owner_id),
		page_content_id_idx: index('page_content_id_idx')
			.on(table.page_content_id),
		
	}
})

export const relations_page = relations(table_pages, ({ one }) => {
	return {
		owner  : one(table_users, {
			fields    : [ table_pages.page_owner_id ],
			references: [ table_users.user_id ]
		}),
		product: one(table_products, {
			fields    : [ table_pages.page_id ],
			references: [ table_products.product_page_id ]
		})
	}
})

export const SelectPageSchema = createSelectSchema(table_pages)
export const UpdatePageSchema = createUpdateSchema(table_pages)
export const InsertPageSchema = createInsertSchema(table_pages)