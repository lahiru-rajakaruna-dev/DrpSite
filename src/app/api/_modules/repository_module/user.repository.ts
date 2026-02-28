import {TOrmTypes} from "@/app/api/_modules/orm_module/orm.interface";
import {
	BaseRepository,
	RepositoryError
}                  from "@/app/api/_modules/repository_module/abstract.repository";
import {
	table_users,
	TInsertUser,
	TSelectUser,
	TUpdateUser
}                  from "@drizzle/schema";
import {eq}        from "drizzle-orm";



export class UserRepository<TOrmType extends TOrmTypes> {
	private base_repository: BaseRepository<TOrmType>

	constructor(baseRepository: BaseRepository<TOrmType>) {
		this.base_repository = baseRepository
	}

	async deleteOne(
		userID: string,
	): Promise<boolean> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'delete_one'
			)
		}

		const result = await this.base_repository.orm.driver.delete(table_users)
								 .where(eq(
									 table_users.user_id,
									 userID
								 ))
								 .returning()

		this.base_repository.logger.logAndReturn(
			result,
			'operation: delete_one'
		)

		return true
	}

	async createOne(
		userID: string,
		data: TInsertUser
	): Promise<TSelectUser> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'create_one'
			)
		}

		if (Object.entries(data).length <= 0) {
			throw new RepositoryError(
				'Invalid data',
				'create_one'
			)
		}

		const result = await this.base_repository.orm.driver.insert(table_users)
								 .values({
											 ...data,
											 user_id: userID
										 })
								 .returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'create_one'
		)
	}

	async getAll(): Promise<TSelectUser[]> {
		const result = await this.base_repository.orm.driver.query.table_users.findMany()
		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_all'
		);
	}

	async getOne(userID: string): Promise<TSelectUser | undefined> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'get_one'
			)
		}

		const result = await this.base_repository
								 .orm
								 .driver
								 .query
								 .table_users
								 .findFirst(
									 {
										 where(columns) {
											 return eq(
												 columns.user_id,
												 userID
											 )
										 }
									 })

		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_one'
		)
	}

	async updateOne(
		userID: string,
		updates: TUpdateUser
	): Promise<TSelectUser | undefined> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'update_one'
			)
		}

		if (Object.entries(updates).length <= 0) {
			throw new RepositoryError(
				'Invalid updates',
				'update_one'
			)
		}

		const result = await this.base_repository
								 .orm
								 .driver.update(table_users)
								 .set(updates)
								 .where(eq(table_users.user_id, userID))
								 .returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'operation: update_one'
		)
	}

}