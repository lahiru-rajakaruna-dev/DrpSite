import {relations}   from 'drizzle-orm';
import {
	foreignKey,
	index,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp
}                    from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
}                    from 'drizzle-zod';
import {z}           from "zod";
import {table_pages} from './pages';
import {table_sales} from './sales';
import {table_users} from './users';



export const product_status = [
	'BANNED',
	'DEACTIVATED',
	'DRAFT',
	'ACTIVE'
] as const

export const table_products = pgTable(
	'products',
	{
		product_id              : text()
			.notNull(),
		product_owner_id        : text()
			.notNull(),
		product_page_id         : text()
			.notNull(),
		product_name            : text()
			.notNull(),
		product_stock_unit_count: integer()
			.notNull()
			.default(0),
		product_status          : text({enum: product_status})
			.notNull()
			.default('DRAFT'),
		created_at              : timestamp({mode: 'date', precision: 6})
			.notNull()
			.defaultNow(),
		updated_at              : timestamp({mode: 'date', precision: 6})
			.notNull()
			.$onUpdate(() => new Date(Date.now()))
	},
	(table) => {
		return {
			pk                 : primaryKey({
												name   : 'product_id_pk',
												columns: [table.product_id]
											}),
			product_owner_id_fk: foreignKey({
												name          : 'product_owner_id_fk',
												columns       : [table.product_owner_id],
												foreignColumns: [table_users.user_id]
											}),
			product_page_id_fk : foreignKey({
												name          : 'product_page_id_fk',
												columns       : [table.product_page_id],
												foreignColumns: [table_pages.page_id]
											}),

			product_owner_id_idx: index(
				'product_owner_id_idx')
				.on(table.product_owner_id),
			product_page_id_idx : index(
				'product_page_id_idx')
				.on(table.product_page_id)
		}
	}
)

export const relations_product = relations(
	table_products,
	({one, many}) => {
		return {
			owner: one(
				table_users,
				{
					fields    : [table_products.product_owner_id],
					references: [table_users.user_id]
				}
			),
			page : one(
				table_pages,
				{
					fields    : [table_products.product_page_id],
					references: [table_pages.page_id]
				}
			),
			sales: many(table_sales)
		}
	}
)

export const SelectProductSchema = createSelectSchema(table_products)
export const UpdateProductSchema = createUpdateSchema(table_products)
export const InsertProductSchema = createInsertSchema(table_products)

export type TSelectProduct = z.infer<typeof SelectProductSchema>
export type TInsertProduct = z.infer<typeof InsertProductSchema>
export type TUpdateProduct = z.infer<typeof UpdateProductSchema>
