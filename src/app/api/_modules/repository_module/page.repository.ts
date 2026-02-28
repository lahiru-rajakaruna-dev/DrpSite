import {TOrmTypes} from "@/app/api/_modules/orm_module/orm.interface";
import {
	BaseRepository,
	RepositoryError
}                  from "@/app/api/_modules/repository_module/abstract.repository";
import {
	table_pages,
	TInsertPage,
	TSelectPage,
	TUpdatePage
}                  from "@drizzle/schema";
import {eq}        from "drizzle-orm";
import {and}       from "drizzle-orm/sql/expressions/conditions";



export class PageRepository<TOrmType extends TOrmTypes> {
	private readonly base_repository: BaseRepository<TOrmType>

	constructor(baseRepository: BaseRepository<TOrmType>) {
		this.base_repository = baseRepository
	}

	async createOne(userID: string, data: TInsertPage): Promise<TSelectPage> {
		if (!userID) {
			throw new RepositoryError('USER_ID not provided', 'create_one')
		}

		if (Object.entries(data).length <= 0) {
			throw new RepositoryError('Invalid data', 'create_one')
		}

		const result = await this.base_repository.orm.driver.insert(table_pages)
								 .values({
											 ...data, page_owner_id: userID,
										 }).returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'operation: create_one'
		)
	}

	async getAll(userID: string): Promise<TSelectPage[]> {
		if (!userID) {
			throw new RepositoryError('USER_ID not provided', 'get_all')
		}

		const result = await this.base_repository.orm.driver.query.table_pages.findMany(
			{
				where(columns) {
					return eq(columns.page_owner_id, userID)
				}
			})

		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_all'
		)
	}

	async getOne(userID: string, id: string): Promise<TSelectPage | undefined> {
		if (!userID) {
			throw new RepositoryError('USER_ID not provided', 'get_one')
		}

		if (!id) {
			throw new RepositoryError('ID not provided', 'get_one')
		}

		const result = await this.base_repository.orm.driver.query.table_pages.findFirst(
			{
				where(columns) {
					return and(
						eq(columns.page_owner_id, userID),
						eq(columns.page_id, id)
					)
				}
			})

		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_one'
		);
	}

	async updateOne(
		userID: string,
		id: string,
		updates: TUpdatePage
	): Promise<TSelectPage | undefined> {
		if (!userID) {
			throw new RepositoryError('USER_ID not provided', 'update_one')
		}

		if (!id) {
			throw new RepositoryError('ID not provided', 'update_one')
		}

		if (Object.entries(updates).length <= 0) {
			throw new RepositoryError('Invalid updates', 'update_one')
		}

		const result = await this.base_repository.orm.driver.update(table_pages)
								 .set(updates)
								 .where(
									 and(
										 eq(table_pages.page_owner_id, userID),
										 eq(table_pages.page_id, id)
									 )
								 ).returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'operation: update_one'
		);
	}

	async deleteOne(userID: string, id: string): Promise<boolean> {
		if (!userID) {
			throw new RepositoryError('USER_ID not provided', 'delete_one')
		}

		if (!id) {
			throw new RepositoryError('ID not provided', 'delete_one')
		}

		const result = await this.base_repository.orm.driver.delete(table_pages)
								 .where(and(
											eq(
												table_pages.page_owner_id,
												userID
											),
											eq(table_pages.page_id, id)
										)
								 ).returning();

		this.base_repository.logger.logAndReturn(
			result[0],
			'operation: delete_one'
		)

		return true
	}

}
