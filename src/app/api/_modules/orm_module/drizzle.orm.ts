import {LoggerServiceFactory} from "@/app/api/_modules/logger_module/logger.factory";
import {BaseOrmService}       from "@/app/api/_modules/orm_module/abstract.orm";
import * as schema            from "@drizzle/schema";
import {
	table_pages,
	table_products,
	table_users,
	TInsertPage,
	TInsertProduct,
	TInsertUser,
	TSelectPage,
	TSelectProduct,
	TSelectUser,
	TUpdatePage,
	TUpdateProduct,
	TUpdateUser
}                             from "@drizzle/schema";

import * as dotenv from 'dotenv'
import {eq}        from "drizzle-orm";
import {
	drizzle,
	NodePgDatabase
}                  from "drizzle-orm/node-postgres";
import {and}       from "drizzle-orm/sql/expressions/conditions";
import path        from "node:path";
import {Client}    from "pg";



dotenv.config({
				  path: [
					  path.resolve(
						  process.cwd(),
						  './env.development'
					  ), path.resolve(
						  process.cwd(),
						  './env.production'
					  )
				  ]
			  })



export class DrizzleOrmService extends BaseOrmService {
	private readonly drizzle_driver: NodePgDatabase<typeof schema>

	private constructor(postgresClient: Client) {
		super(LoggerServiceFactory.getLogger())

		this.drizzle_driver = drizzle(postgresClient)
	}

	public static async getInstance() {
		if (!this.instance) {
			const dbClient = new Client({
											connectionString: process.env.DATABASE_URL
										})

			await dbClient.connect()

			this.instance = new DrizzleOrmService(dbClient)
		}

		return this.instance
	}

	async createPage(page: TInsertPage): Promise<TSelectPage> {
		try {
			const result = await this.drizzle_driver.insert(table_pages)
									 .values({...page, page_owner_id: userID})
				page).returning()
			return this.logger.logAndReturn(
				result[0],
				'operation: create_page'
			);
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'create_page',
				{data: page}
			)
		}
	}

	async createProduct(product: TInsertProduct): Promise<TSelectProduct> {
		try {
			const result = await this.drizzle_driver.insert(table_products)
									 .values(product)
									 .returning()
			return this.logger.logAndReturn(
				result[0],
				'operation: create_product'
			);
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'create_page',
				{data: product}
			)
		}
	}

	async createUser(user: TInsertUser): Promise<TSelectUser> {
		try {
			const result = await this.drizzle_driver.insert(table_users)
									 .values(user)
									 .returning()
			return this.logger.logAndReturn(
				result[0],
				'operation: create_user'
			);
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'create_user',
				{data: user}
			)
		}
	}

	async deletePageById(id: string): Promise<boolean> {
		try {
			const result = await this.drizzle_driver.delete(table_pages).where(
				eq(table_pages.page_id, id)).returning()
			this.logger.log(JSON.stringify(result[0]))
			return true
		} catch (e) {
			throw new OrmError((e as Error).message, 'delete_user', {id: id})
		}
	}

	async deleteProductById(id: string): Promise<boolean> {
		try {
			const result = await this.drizzle_driver.delete(table_products)
									 .where(
										 eq(table_products.product_id, id))
									 .returning()
			this.logger.log(JSON.stringify(result[0]))
			return true
		} catch (e) {
			throw new OrmError((e as Error).message, 'delete_product', {id: id})
		}
	}

	async deleteUserById(id: string): Promise<boolean> {
		try {
			const result = await this.drizzle_driver.delete(table_users)
									 .where(
										 eq(table_users.user_id, id))
									 .returning()
			this.logger.log(JSON.stringify(result[0]))
			return true
		} catch (e) {
			throw new OrmError((e as Error).message, 'delete_user', {id: id})
		}
	}

	async getPageById(id: string): Promise<TSelectPage | undefined> {
		try {
			const result = await this.drizzle_driver.query.table_pages.findFirst(
				{
					where(columns) {
						return eq(columns.page_id, id)
					}
				})

			return this.logger.logAndReturn(result, 'operation: get_page_by_id')
		} catch (e) {
			throw new OrmError((e as Error).message, 'get_page_by_id', {id: id})
		}
	}

	async getPagesByUserId(userId: string): Promise<TSelectPage[]> {
		try {
			const result = await this.drizzle_driver.query.table_pages.findMany(
				{
					where(columns) {
						return eq(columns.page_owner_id, userId)
					}
				})

			return this.logger.logAndReturn(
				result,
				'operation: get_pages_by_user_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_pages_by_user_id',
				{user_id: userId}
			)
		}
	}

	async getProductById(id: string): Promise<TSelectProduct | undefined> {
		try {
			const result = await this.drizzle_driver.query.table_products.findFirst(
				{
					where(columns) {
						return eq(columns.product_id, id)
					}
				})

			return this.logger.logAndReturn(
				result,
				'operation: get_product_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_product_by_id',
				{product_id: id}
			)
		}
	}

	async getProductsByUserId(userId: string): Promise<TSelectProduct[]> {
		try {
			const result = await this.drizzle_driver.query.table_products.findMany(
				{
					where(columns) {
						return eq(columns.product_owner_id, userId)
					}
				})

			return this.logger.logAndReturn(
				result,
				'operation: get_products_by_user_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_products',
				{user_id: userId}
			)
		}
	}

	async getUserById(id: string): Promise<TSelectUser | undefined> {
		try {
			const result = await this.drizzle_driver.query.table_users.findFirst(
				{
					where(columns) {
						return eq(columns.user_id, id)
					}
				})
			return this.logger.logAndReturn(result, 'operation: get_user_by_id')
		} catch (e) {
			throw new OrmError((e as Error).message, 'get_user_by_id', {id: id})
		}
	}

	async getUsers(): Promise<TSelectUser[]> {
		try {
			const result = await this.drizzle_driver.query.table_users
									 .findMany()

			return this.logger.logAndReturn(result, 'get_users')
		} catch (e) {
			throw new OrmError((e as Error).message, 'get_users')
		}
	}

	async updatePageById(
		id: string,
		pageUpdates: TUpdatePage
	): Promise<TSelectPage> {
		try {
			const result = await this.drizzle_driver.update(table_pages)
									 .set(pageUpdates)
									 .where(eq(table_pages.page_id, id))
									 .returning()

			return this.logger.logAndReturn(
				result[0],
				'operation: update_page_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'update_page_by_id',
				{id: id, updates: pageUpdates}
			)
		}
	}

	async updateProductById(
		id: string,
		productUpdates: TUpdateProduct
	): Promise<TSelectProduct> {
		try {
			const result = await this.drizzle_driver.update(table_products)
									 .set(productUpdates)
									 .where(eq(table_products.product_id, id))
									 .returning()

			return this.logger.logAndReturn(
				result[0],
				'operation: update_product_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'update_product_by_id',
				{id: id, updates: productUpdates}
			)
		}
	}

	async updateUserById(
		id: string,
		userUpdates: TUpdateUser
	): Promise<TSelectUser> {
		try {
			const result = await this.drizzle_driver.update(table_users)
									 .set(userUpdates)
									 .where(eq(table_users.user_id, id))
									 .returning()

			return this.logger.logAndReturn(
				result[0],
				'operation: update_user_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'update_user_by_id',
				{id: id, updates: userUpdates}
			)
		}
	}
}



export class OrmError extends Error {
	private readonly context: Record<string, any> = {}
	private readonly operation: string;

	constructor(
		message: string,
		operation: string,
		context: Record<string, any> = {}
	) {
		super(message);
		this.operation = operation
		this.context   = context
	}

	toString() {
		return {
			message  : this.message,
			operation: this.operation,
			context  : this.context
		}
	}

}