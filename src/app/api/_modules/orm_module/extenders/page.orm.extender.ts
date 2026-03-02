import {BaseOrmService}    from "@/app/api/_modules/orm_module/abstract.orm";
import {
	OrmError,
	TDrizzleOrm
}                          from "@/app/api/_modules/orm_module/drizzle.orm";
import {IOrmPageManagable} from "@/app/api/_modules/orm_module/orm.interface";
import {
	table_pages,
	TInsertPage,
	TSelectPage,
	TUpdatePage
}                          from "@drizzle/schema";
import {eq}                from "drizzle-orm";
import {and}               from "drizzle-orm/sql/expressions/conditions";



export class PageExtendedOrm implements IOrmPageManagable {

	private static instance: PageExtendedOrm | undefined;
	private readonly orm: BaseOrmService;

	constructor(baseOrm: BaseOrmService) {
		this.orm = baseOrm

	}

	async createPage(
		page: TInsertPage
	): Promise<TSelectPage> {
		try {
			const result = await this.orm.driver.insert(table_pages)
									 .values(page)
									 .returning()

			return this.orm.logger.logAndReturn(
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

	async getPage(
		userID: string,
		id: string
	): Promise<TSelectPage | undefined> {
		try {
			const result = await this.orm.driver.query.table_pages.findFirst(
				{
					where(columns) {
						return and(
							eq(
								columns.page_owner_id,
								userID
							),
							eq(
								columns.page_id,
								id
							)
						)
					}
				})

			return this.orm.logger.logAndReturn(
				result,
				'operation: get_page_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_page_by_id',
				{id: id}
			)
		}
	}

	async getPages(userId: string): Promise<TSelectPage[]> {
		try {
			const result = await this.orm.driver.query.table_pages.findMany(
				{
					where(columns) {
						return eq(
							columns.page_owner_id,
							userId
						)
					}
				})

			return this.orm.logger.logAndReturn(
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

	async updatePage(
		userID: string,
		id: string,
		pageUpdates: TUpdatePage
	): Promise<TSelectPage> {
		try {
			const result = await this.orm.driver.update(table_pages)
									 .set(pageUpdates)
									 .where(
										 and(
											 eq(
												 table_pages.page_id,
												 id
											 ),
											 eq(
												 table_pages.page_owner_id,
												 userID
											 )
										 ))
									 .returning()

			return this.orm.logger.logAndReturn(
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

	async deletePage(
		userID: string,
		id: string
	): Promise<boolean> {
		try {
			const result = await this.orm.driver.delete(table_pages)
									 .where(
										 and(
											 eq(
												 table_pages.page_id,
												 id
											 ),
											 eq(
												 table_pages.page_owner_id,
												 userID
											 )
										 ))
									 .returning()
			this.orm.logger.log(JSON.stringify(result[0]))
			return true
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'delete_user',
				{id: id}
			)
		}
	}
}